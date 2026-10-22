import { deliverFormEmail, isAllowedFormOrigin } from '../server/formEmail.js';

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && !isAllowedFormOrigin(origin)) {
    return res.status(403).json({ ok: false, message: 'This website is not allowed to submit this form.' });
  }

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Idempotency-Key');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ ok: false, message: 'Method not allowed.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, message: 'Please check the form and try again.' });
    }
  }

  const result = await deliverFormEmail(body, { idempotencyKey: req.headers['idempotency-key'] });
  return res.status(result.status).json(result.body);
}
