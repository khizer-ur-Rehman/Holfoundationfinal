import test from 'node:test';
import assert from 'node:assert/strict';
import { deliverFormEmail, isAllowedFormOrigin } from '../server/formEmail.js';
import apiHandler from '../api/send-email.js';

const originalFetch = globalThis.fetch;
const originalApiKey = process.env.RESEND_API_KEY;
const originalFromEmail = process.env.FORM_FROM_EMAIL;
const originalAllowedOrigins = process.env.FORM_ALLOWED_ORIGINS;

test.beforeEach(() => {
  process.env.RESEND_API_KEY = 'test-resend-key';
  delete process.env.FORM_FROM_EMAIL;
  delete process.env.FORM_ALLOWED_ORIGINS;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalApiKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalApiKey;
  if (originalFromEmail === undefined) delete process.env.FORM_FROM_EMAIL;
  else process.env.FORM_FROM_EMAIL = originalFromEmail;
  if (originalAllowedOrigins === undefined) delete process.env.FORM_ALLOWED_ORIGINS;
  else process.env.FORM_ALLOWED_ORIGINS = originalAllowedOrigins;
});

const submissions = [
  ['contact', { name: 'Areeba', email: 'areeba@example.com', message: 'Hello', topic: 'Programs' }],
  ['job', { name: 'Sameer', email: 'sameer@example.com', role: 'Teacher', intro: 'I have experience.' }],
  ['internship', { name: 'Ali', email: 'ali@example.com', field: 'Education', intro: 'I want to learn.' }],
  ['volunteer', { name: 'Sara', email: 'sara@example.com', area: 'Education', intro: 'I can help.' }],
];

test('sends each supported form to both recipients and forwards idempotency key', async (t) => {
  for (const [type, fields] of submissions) {
    await t.test(type, async () => {
      let requestUrl;
      let requestOptions;
      globalThis.fetch = async (url, options) => {
        requestUrl = url;
        requestOptions = options;
        return new Response(JSON.stringify({ id: 'email-test-id' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      };

      const result = await deliverFormEmail({ type, fields }, { idempotencyKey: 'test-submission-123' });
      const sentEmail = JSON.parse(requestOptions.body);

      assert.equal(requestUrl, 'https://api.resend.com/emails');
      assert.equal(requestOptions.method, 'POST');
      assert.equal(requestOptions.headers['Idempotency-Key'], 'test-submission-123');
      assert.deepEqual(sentEmail.to, ['info@holwelfare.org', 'sameer@iterativelab.pk']);
      assert.equal(sentEmail.reply_to, fields.email);
      assert.equal(result.status, 200);
      assert.deepEqual(result.body, { ok: true });
    });
  }
});

test('does not report success when Resend rejects the email', async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ message: 'domain not verified' }), { status: 403 });

  const result = await deliverFormEmail({
    type: 'contact',
    fields: { name: 'Areeba', email: 'areeba@example.com', message: 'Hello' },
  });

  assert.equal(result.status, 502);
  assert.equal(result.body.ok, false);
});

test('rejects honeypot submissions without claiming they were delivered', async () => {
  globalThis.fetch = async () => {
    throw new Error('Email API should not be called for honeypot submissions');
  };

  const result = await deliverFormEmail({
    type: 'contact',
    website: 'bot-filled-trap',
    fields: { name: 'Bot', email: 'bot@example.com', message: 'spam' },
  });

  assert.equal(result.status, 400);
  assert.equal(result.body.ok, false);
});

test('returns an error when Resend is not configured', async () => {
  delete process.env.RESEND_API_KEY;
  globalThis.fetch = async () => {
    throw new Error('Email API should not be called without an API key');
  };

  const result = await deliverFormEmail({
    type: 'contact',
    fields: { name: 'Areeba', email: 'areeba@example.com', message: 'Hello' },
  });

  assert.equal(result.status, 503);
  assert.equal(result.body.ok, false);
});

test('allows production, configured local, and Vercel preview origins only', () => {
  assert.equal(isAllowedFormOrigin('https://holwelfare.org'), true);
  assert.equal(isAllowedFormOrigin('https://holfoundationfinal-git-main-team.vercel.app'), true);
  assert.equal(isAllowedFormOrigin('https://unrelated.example'), false);
});

test('Vercel API route returns success only after Resend accepts the email', async () => {
  let requestOptions;
  globalThis.fetch = async (_url, options) => {
    requestOptions = options;
    return new Response(JSON.stringify({ id: 'email-route-test-id' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  const res = {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };

  await apiHandler({
    method: 'POST',
    headers: { origin: 'https://holwelfare.org', 'idempotency-key': 'route-test-id' },
    body: { type: 'contact', fields: { name: 'Areeba', email: 'areeba@example.com', message: 'Hello' } },
  }, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(requestOptions.headers['Idempotency-Key'], 'route-test-id');
});
