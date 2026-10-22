<?php
/* StackCP-compatible Resend endpoint for HOL Foundation forms. */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function hol_json_response($status, $payload) {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function hol_fail($status, $message) {
    hol_json_response($status, array('ok' => false, 'message' => $message));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    hol_fail(405, 'Method not allowed.');
}

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin !== '') {
    $originHost = parse_url($origin, PHP_URL_HOST);
    $requestHost = isset($_SERVER['HTTP_HOST']) ? strtolower(preg_replace('/:\\d+$/', '', $_SERVER['HTTP_HOST'])) : '';
    if (!$originHost || strtolower($originHost) !== $requestHost) {
        hol_fail(403, 'This website is not allowed to submit this form.');
    }
}

$contentType = isset($_SERVER['CONTENT_TYPE']) ? strtolower($_SERVER['CONTENT_TYPE']) : '';
if (strpos($contentType, 'application/json') !== 0) {
    hol_fail(415, 'Please submit the form again.');
}
$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 20000) {
    hol_fail(413, 'The form submission is too large.');
}
$body = json_decode($rawBody, true);
if (!is_array($body) || !isset($body['fields']) || !is_array($body['fields'])) {
    hol_fail(400, 'Please check the form and try again.');
}
if (!empty($body['website'])) {
    hol_fail(400, 'Please check the form and try again.');
}

$formTypes = array(
    'contact' => array(
        'title' => 'Website contact message',
        'fields' => array('name' => 'Name', 'email' => 'Email', 'phone' => 'Phone', 'topic' => 'Topic', 'message' => 'Message'),
        'required' => array('name', 'email', 'message')
    ),
    'job' => array(
        'title' => 'Job application',
        'fields' => array('name' => 'Name', 'email' => 'Email', 'phone' => 'Phone', 'role' => 'Role of interest', 'profile' => 'CV or profile link', 'intro' => 'Introduction'),
        'required' => array('name', 'email', 'role', 'intro')
    ),
    'internship' => array(
        'title' => 'Internship application',
        'fields' => array('name' => 'Name', 'email' => 'Email', 'phone' => 'Phone', 'institution' => 'Institution', 'field' => 'Area of interest', 'availability' => 'Availability', 'intro' => 'Introduction'),
        'required' => array('name', 'email', 'field', 'intro')
    ),
    'volunteer' => array(
        'title' => 'Volunteer application',
        'fields' => array('name' => 'Name', 'email' => 'Email', 'phone' => 'Phone', 'area' => 'Area of interest', 'availability' => 'Availability', 'intro' => 'Introduction'),
        'required' => array('name', 'email', 'area', 'intro')
    )
);

$type = isset($body['type']) && is_string($body['type']) ? $body['type'] : '';
if (!isset($formTypes[$type])) {
    hol_fail(400, 'Please check the form and try again.');
}
$formConfig = $formTypes[$type];
$fields = array();
foreach ($formConfig['fields'] as $key => $label) {
    $value = isset($body['fields'][$key]) && is_string($body['fields'][$key]) ? $body['fields'][$key] : '';
    $value = trim(preg_replace('/[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F]/', '', $value));
    $fields[$key] = substr($value, 0, 4000);
    if (in_array($key, $formConfig['required'], true) && $fields[$key] === '') {
        hol_fail(400, 'Please provide ' . strtolower($label) . '.');
    }
}
if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    hol_fail(400, 'Please provide a valid email address.');
}

/* Store hol-form-config.php outside public_html. HOL_FORM_CONFIG can point to it explicitly. */
$configPaths = array();
$configuredPath = getenv('HOL_FORM_CONFIG');
if ($configuredPath) {
    $configPaths[] = $configuredPath;
}
$homePath = getenv('HOME');
if ($homePath) {
    $configPaths[] = rtrim($homePath, DIRECTORY_SEPARATOR) . '/private/hol-form-config.php';
}
$documentRoot = isset($_SERVER['DOCUMENT_ROOT']) ? realpath($_SERVER['DOCUMENT_ROOT']) : false;
if ($documentRoot) {
    $configPaths[] = dirname($documentRoot) . '/private/hol-form-config.php';
    $configPaths[] = dirname(dirname($documentRoot)) . '/private/hol-form-config.php';
    $configPaths[] = dirname(dirname(dirname($documentRoot))) . '/private/hol-form-config.php';
}
$privateConfig = array();
foreach (array_unique($configPaths) as $configPath) {
    $resolvedPath = realpath($configPath);
    if ($resolvedPath && is_file($resolvedPath) && is_readable($resolvedPath)) {
        if ($documentRoot && strpos($resolvedPath, $documentRoot . DIRECTORY_SEPARATOR) === 0) {
            continue;
        }
        $loadedConfig = require $resolvedPath;
        if (is_array($loadedConfig)) {
            $privateConfig = $loadedConfig;
            break;
        }
    }
}
$apiKey = getenv('RESEND_API_KEY');
if (!$apiKey && isset($privateConfig['resend_api_key'])) {
    $apiKey = $privateConfig['resend_api_key'];
}
if (!is_string($apiKey) || trim($apiKey) === '') {
    error_log('[HOL form email] Resend API key is not configured.');
    hol_fail(503, 'Form email is not configured yet. Please email info@holwelfare.org directly.');
}

$safeName = preg_replace('/[\\r\\n]+/', ' ', $fields['name']);
$subject = $formConfig['title'] . ' from ' . substr($safeName, 0, 100);
$messageLines = array();
foreach ($formConfig['fields'] as $key => $label) {
    $messageLines[] = $label . ': ' . ($fields[$key] !== '' ? $fields[$key] : 'Not provided');
}
$payload = array(
    'from' => isset($privateConfig['from_email']) && is_string($privateConfig['from_email'])
        ? $privateConfig['from_email']
        : 'HOL Foundation Website <forms@holwelfare.org>',
    'to' => array('info@holwelfare.org', 'sameer@iterativelab.pk'),
    'reply_to' => $fields['email'],
    'subject' => $subject,
    'text' => implode("\n\n", $messageLines)
);
$idempotencyKey = isset($_SERVER['HTTP_IDEMPOTENCY_KEY']) ? $_SERVER['HTTP_IDEMPOTENCY_KEY'] : '';
$headers = array(
    'Authorization: Bearer ' . trim($apiKey),
    'Content-Type: application/json'
);
if ($idempotencyKey !== '' && strlen($idempotencyKey) <= 256 && preg_match('/^[A-Za-z0-9._:-]+$/', $idempotencyKey)) {
    $headers[] = 'Idempotency-Key: ' . $idempotencyKey;
}

if (filter_var(ini_get('allow_url_fopen'), FILTER_VALIDATE_BOOLEAN) !== true
    || !extension_loaded('openssl')
    || !in_array('https', stream_get_wrappers(), true)) {
    error_log('[HOL form email] PHP HTTPS stream requirements are unavailable (allow_url_fopen/OpenSSL/HTTPS wrapper).');
    hol_fail(503, 'The email service is temporarily unavailable. Please try again shortly.');
}

$encodedPayload = json_encode($payload);
if ($encodedPayload === false) {
    error_log('[HOL form email] Could not encode the Resend request payload.');
    hol_fail(500, 'We could not send your message right now. Please try again shortly.');
}
$requestContext = stream_context_create(array(
    'http' => array(
        'method' => 'POST',
        'header' => implode("\r\n", $headers),
        'content' => $encodedPayload,
        'timeout' => 12,
        'ignore_errors' => true,
        'protocol_version' => 1.1
    ),
    'ssl' => array(
        'verify_peer' => true,
        'verify_peer_name' => true,
        'SNI_enabled' => true
    )
));
$streamError = '';
set_error_handler(function ($severity, $message) use (&$streamError) {
    $streamError = $message;
    return true;
});
$providerBody = file_get_contents('https://api.resend.com/emails', false, $requestContext);
restore_error_handler();

$providerStatus = 0;
if (isset($http_response_header) && is_array($http_response_header)) {
    foreach ($http_response_header as $responseHeader) {
        if (preg_match('/^HTTP\/\S+\s+(\d{3})/', $responseHeader, $statusMatch)) {
            $providerStatus = (int) $statusMatch[1];
        }
    }
}
if ($providerBody === false || $providerStatus < 200 || $providerStatus >= 300) {
    error_log('[HOL form email] Resend stream request failed (HTTP ' . $providerStatus . '): ' . substr((string) $streamError . ' ' . (string) $providerBody, 0, 1000));
    hol_fail(502, 'We could not send your message right now. Please try again shortly.');
}
$providerResult = json_decode($providerBody, true);
if (!is_array($providerResult) || empty($providerResult['id'])) {
    error_log('[HOL form email] Resend returned an unexpected success response.');
    hol_fail(502, 'We could not send your message right now. Please try again shortly.');
}
hol_json_response(200, array('ok' => true));
