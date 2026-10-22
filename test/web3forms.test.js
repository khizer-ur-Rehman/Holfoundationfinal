import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { sendFormSubmission } from '../src/lib/formSubmission.js';

const ACCESS_KEY = 'test-public-access-key';
const originalFetch = globalThis.fetch;
const originalWindow = globalThis.window;

test.beforeEach(() => {
  globalThis.window = {
    setTimeout: globalThis.setTimeout.bind(globalThis),
    clearTimeout: globalThis.clearTimeout.bind(globalThis),
  };
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalWindow === undefined) delete globalThis.window;
  else globalThis.window = originalWindow;
});

const submissions = [
  ['contact', { name: 'Areeba', email: 'areeba@example.com', phone: '123', topic: 'Programs', message: 'Hello' }],
  ['job', { name: 'Sameer', email: 'sameer@example.com', phone: '123', role: 'Teacher', profile: 'https://example.com/cv', intro: 'I have experience.' }],
  ['internship', { name: 'Ali', email: 'ali@example.com', phone: '123', institution: 'College', field: 'Education', availability: 'Flexible', intro: 'I want to learn.' }],
  ['volunteer', { name: 'Sara', email: 'sara@example.com', phone: '123', area: 'Education', availability: 'Flexible', intro: 'I can help.' }],
];

test('sends all four form types to Web3Forms with recipient and form data', async (t) => {
  for (const [type, fields] of submissions) {
    await t.test(type, async () => {
      let requestUrl;
      let requestOptions;
      globalThis.fetch = async (url, options) => {
        requestUrl = url;
        requestOptions = options;
        return new Response(JSON.stringify({ success: true, body: { message: 'Email sent successfully!' } }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      };
      const form = { elements: { _honey: { value: '' } } };

      const result = await sendFormSubmission(type, fields, form, ACCESS_KEY);
      const payloadEntries = [...requestOptions.body.entries()];
      const payload = Object.fromEntries(payloadEntries);

      assert.equal(requestUrl, 'https://api.web3forms.com/submit');
      assert.equal(requestOptions.method, 'POST');
      assert.equal(requestOptions.headers, undefined);
      assert.equal(payload.access_key, ACCESS_KEY);
      assert.equal(payload.email, fields.email);
      assert.deepEqual(payloadEntries.filter(([key]) => key === 'email').map(([, value]) => value), [fields.email]);
      assert.equal(Object.hasOwn(payload, 'ccemail'), false);
      assert.equal(payload.from_name, 'HOL Foundation Website');
      assert.equal(payload.botcheck, '');
      for (const [key, value] of Object.entries(fields)) assert.equal(payload[key], value);
      assert.equal(result.success, true);
    });
  }
});

test('does not report success if Web3Forms rejects a request', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ success: false, body: { message: 'Invalid access key' } }), { status: 400 });
  await assert.rejects(
    sendFormSubmission('contact', submissions[0][1], null, ACCESS_KEY),
    /Invalid access key/,
  );
});

test('does not report success without the explicit Web3Forms success flag', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ message: 'Accepted' }), { status: 200 });
  await assert.rejects(
    sendFormSubmission('contact', submissions[0][1], null, ACCESS_KEY),
    /Accepted/,
  );
});

test('does not call Web3Forms or claim success when the build key is missing', async () => {
  globalThis.fetch = async () => { throw new Error('Web3Forms should not be called without an Access Key'); };
  await assert.rejects(
    sendFormSubmission('contact', submissions[0][1], null, ''),
    /Form email is not configured/,
  );
});

test('uses the useful provider error and redacts the access key', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ success: false, message: `Access denied for ${ACCESS_KEY}` }), { status: 401 });
  await assert.rejects(
    sendFormSubmission('contact', submissions[0][1], null, ACCESS_KEY),
    (error) => error.message === 'Access denied for [hidden]',
  );
});

test('prevents duplicate submissions while a request is in flight', async () => {
  let finishRequest;
  globalThis.fetch = () => new Promise((resolve) => { finishRequest = resolve; });
  const form = { elements: { _honey: { value: '' } } };
  const first = sendFormSubmission('contact', submissions[0][1], form, ACCESS_KEY);
  await assert.rejects(
    sendFormSubmission('contact', submissions[0][1], form, ACCESS_KEY),
    /already being submitted/,
  );
  finishRequest(new Response(JSON.stringify({ success: true }), { status: 200 }));
  await first;
});

test('forms use the official endpoint and the build key is documented without a real key', async () => {
  const [contact, careers, envExample, deploymentGuide] = await Promise.all([
    readFile(new URL('../src/pages/ContactPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/CareersPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../.env.example', import.meta.url), 'utf8'),
    readFile(new URL('../STACKCP-DEPLOY.md', import.meta.url), 'utf8'),
  ]);
  assert.equal((contact.match(/action="https:\/\/api\.web3forms\.com\/submit"/g) || []).length, 1);
  assert.equal((careers.match(/action="https:\/\/api\.web3forms\.com\/submit"/g) || []).length, 3);
  assert.match(envExample, /VITE_WEB3FORMS_ACCESS_KEY=\s*(?:\r?\n|$)/);
  assert.match(deploymentGuide, /Free plan allows 250 submissions\/month and one recipient/);
  assert.match(deploymentGuide, /no Node\.js or PHP email backend/i);
});
