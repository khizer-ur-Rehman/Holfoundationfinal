# StackCP deployment: website forms

The production build is a static React site plus one PHP endpoint. It sends Contact, Jobs, Internships and Volunteering submissions through Resend to `info@holwelfare.org`.

## 1. Select PHP and check the hosting requirements

1. Sign in to StackCP, open **Manage Hosting**, select the website's package, then choose **Options → Manage**.
2. Under **Web Tools**, open **Change PHP Version** and choose PHP 8.x (PHP 7.4+ is compatible with this endpoint).
3. Confirm the hosting account has `allow_url_fopen` enabled, OpenSSL enabled, and outbound HTTPS access to `api.resend.com` on port 443. This backend uses PHP's built-in HTTPS stream; it does not need Node.js, Composer, or PHP cURL.

StackCP publishes PHP version selection and outbound API connection guidance, but settings can vary by provider/package. For a direct check on this specific hosting package, temporarily create `resend-host-check.php` in `public_html` with the following code, then open `https://holwelfare.org/resend-host-check.php`:

```php
<?php
header('Content-Type: application/json');
$status = 0;
$ctx = stream_context_create(array(
  'http' => array('method' => 'GET', 'timeout' => 6, 'ignore_errors' => true),
  'ssl' => array('verify_peer' => true, 'verify_peer_name' => true)
));
$response = @file_get_contents('https://api.resend.com/emails', false, $ctx);
if (isset($http_response_header)) {
  foreach ($http_response_header as $line) {
    if (preg_match('/^HTTP\/\\S+\\s+(\\d{3})/', $line, $m)) $status = (int) $m[1];
  }
}
echo json_encode(array(
  'php' => PHP_VERSION,
  'allow_url_fopen' => filter_var(ini_get('allow_url_fopen'), FILTER_VALIDATE_BOOLEAN),
  'openssl' => extension_loaded('openssl'),
  'https_wrapper' => in_array('https', stream_get_wrappers(), true),
  'resend_https_reachable' => $response !== false && $status > 0,
  'resend_http_status' => $status
));
```

An HTTP status from Resend (even 401/404 for this unauthenticated GET) confirms the HTTPS connection reached the API. Confirm `php` is 7.4 or newer and all four boolean checks are `true`, then **delete `resend-host-check.php`**. This check sends no email and contains no secret.

## 2. Configure the Resend key privately

1. In StackCP File Manager, open the domain's `public_html` directory and go **up one directory**. Create a sibling folder named `private` there. For example, if the document root is `/home/ACCOUNT/domains/holwelfare.org/public_html`, create `/home/ACCOUNT/domains/holwelfare.org/private/`.
2. Copy `deployment/stackcp/hol-form-config.example.php` into that folder and rename it `hol-form-config.php`.
3. Replace the example key with the real Resend API key. Do not put the key in React, `public_html`, Git, or a screenshot.
4. Restrict the file permissions to the hosting account (600 or 640 if the File Manager offers permissions). The endpoint checks this sibling `private/` path as well as common account-private paths, and refuses to load a config file located inside the web root.
5. Keep the sender as `HOL Foundation Website <forms@holwelfare.org>`; the sending domain/address must be verified in Resend.

## 3. Build and upload

1. Run `npm ci`, then `npm run build` in the project.
2. In StackCP, go to **Manage Hosting → [package] → Options → Manage → File Manager**. Upload the **contents** of `dist/` to the domain's `public_html` directory, including hidden files such as `.htaccess`.
3. Confirm these paths exist on the host:
   - `public_html/index.html`
   - `public_html/api/send-email.php`
   - `public_html/.htaccess`

## 4. Verify delivery

Submit one test from each of Contact, Jobs, Internships and Volunteering. A green tick appears only after Resend returns a successful email ID; a red cross appears for a failed request. Check both inboxes and spam. Resend's verified sending domain must allow `forms@holwelfare.org` as the sender. The first real submission may also require Resend's recipient/domain setup to be approved for production sending.

If a request fails, inspect the hosting PHP error log for the `[HOL form email]` entry. A missing stream requirement returns an error and never a success tick. The API key and provider response are not returned to the browser. Never paste the key into a support ticket or public log.

## Check the specific StackCP account

StackCP documents PHP support and outbound connections to external APIs, but PHP configuration can vary by hosting account. Before launch, confirm `allow_url_fopen` is On, OpenSSL is enabled, and HTTPS egress to `api.resend.com:443` is allowed for this package. The form endpoint checks the PHP settings on every request and returns an error if the required stream support is unavailable. After uploading, test one submission from each form and verify delivery in both inboxes.

## Verification limits

The PHP CLI/runtime and the live StackCP account were not available in the development environment, so PHP lint/runtime execution and real Resend delivery have not been tested here. The project tests validate the frontend endpoint wiring and backend contract; the StackCP preflight and one real submission from each form are still required before launch. A success response is returned only after Resend responds with a successful HTTP status and email ID.

## What gets deployed

Vite copies `public/` into `dist/`, so the PHP endpoint and Apache rewrite rules are part of the normal production build. The private config example is outside `public/` and is not copied into the site build.
