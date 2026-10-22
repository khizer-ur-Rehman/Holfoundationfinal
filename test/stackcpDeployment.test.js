import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const phpEndpoint = await readFile(new URL('../public/api/send-email.php', import.meta.url), 'utf8');
const submissionClient = await readFile(new URL('../src/lib/formSubmission.js', import.meta.url), 'utf8');
const contactPage = await readFile(new URL('../src/pages/ContactPage.jsx', import.meta.url), 'utf8');
const careersPage = await readFile(new URL('../src/pages/CareersPage.jsx', import.meta.url), 'utf8');

test('React forms target the StackCP PHP endpoint and keep duplicate/timeout handling', () => {
  assert.match(submissionClient, /fetch\('\/api\/send-email\.php'/);
  assert.match(submissionClient, /pendingForms/);
  assert.match(submissionClient, /setTimeout\(\(\) => controller\.abort\(\), 20000\)/);
  assert.match(contactPage, /action="\/api\/send-email\.php"/);
  assert.equal((careersPage.match(/action="\/api\/send-email\.php"/g) || []).length, 3);
});

test('StackCP endpoint only reports success after Resend accepts delivery to the configured recipient', () => {
  assert.match(phpEndpoint, /'to' => array\('info@holwelfare\.org'\)/);
  assert.match(phpEndpoint, /getenv\('RESEND_API_KEY'\)/);
  assert.match(phpEndpoint, /HOL_FORM_CONFIG/);
  assert.match(phpEndpoint, /'timeout' => 12/);
  assert.match(phpEndpoint, /file_get_contents\('https:\/\/api\.resend\.com\/emails'/);
  assert.doesNotMatch(phpEndpoint, /curl_(?:init|exec)|CURLOPT_/);
  assert.match(phpEndpoint, /\$providerStatus < 200 \|\| \$providerStatus >= 300/);
  assert.match(phpEndpoint, /hol_json_response\(200, array\('ok' => true\)\)/);
  assert.match(phpEndpoint, /'contact' =>/);
  assert.match(phpEndpoint, /'job' =>/);
  assert.match(phpEndpoint, /'internship' =>/);
  assert.match(phpEndpoint, /'volunteer' =>/);
});
