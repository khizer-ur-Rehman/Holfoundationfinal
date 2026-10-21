const DEFAULT_ALLOWED_ORIGINS = [
  'https://holwelfare.org',
  'https://www.holwelfare.org',
  'https://holfoundationfinal.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

const FORM_CONFIG = {
  contact: {
    title: 'Website contact message',
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      topic: 'Topic',
      message: 'Message',
    },
    required: ['name', 'email', 'message'],
  },
  job: {
    title: 'Job application',
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      role: 'Role of interest',
      profile: 'CV or profile link',
      intro: 'Introduction',
    },
    required: ['name', 'email', 'role', 'intro'],
  },
  internship: {
    title: 'Internship application',
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      institution: 'Institution',
      field: 'Area of interest',
      availability: 'Availability',
      intro: 'Introduction',
    },
    required: ['name', 'email', 'field', 'intro'],
  },
  volunteer: {
    title: 'Volunteer application',
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      area: 'Area of interest',
      availability: 'Availability',
      intro: 'Introduction',
    },
    required: ['name', 'email', 'area', 'intro'],
  },
};

export function getAllowedFormOrigins() {
  const configured = process.env.FORM_ALLOWED_ORIGINS
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return new Set(configured?.length ? configured : DEFAULT_ALLOWED_ORIGINS);
}

export function isAllowedFormOrigin(origin) {
  return !origin || getAllowedFormOrigins().has(origin);
}

export async function deliverFormEmail(body = {}) {
  if (typeof body.website === 'string' && body.website.trim()) {
    return { status: 200, body: { ok: true } };
  }

  const config = FORM_CONFIG[body.type];
  if (!config || !body.fields || typeof body.fields !== 'object' || Array.isArray(body.fields)) {
    return { status: 400, body: { ok: false, message: 'Please check the form and try again.' } };
  }

  const fields = {};
  for (const [key, label] of Object.entries(config.fields)) {
    const value = body.fields[key];
    if (value !== undefined && typeof value !== 'string') {
      return { status: 400, body: { ok: false, message: 'Please check the form and try again.' } };
    }
    fields[key] = (value || '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, 4000);
    if (config.required.includes(key) && !fields[key]) {
      return { status: 400, body: { ok: false, message: `Please provide ${label.toLowerCase()}.` } };
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return { status: 400, body: { ok: false, message: 'Please provide a valid email address.' } };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: 503, body: { ok: false, message: 'Form email is not configured yet. Please email info@holwelfare.org directly.' } };
  }

  const safeName = fields.name.replace(/[\r\n]+/g, ' ').slice(0, 100);
  const subject = `${config.title} from ${safeName}`;
  const text = Object.entries(config.fields)
    .map(([key, label]) => `${label}: ${fields[key] || 'Not provided'}`)
    .join('\n\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.FORM_FROM_EMAIL || 'HOL Foundation Website <forms@holwelfare.org>',
        to: [process.env.FORM_TO_EMAIL || 'info@holwelfare.org'],
        reply_to: fields.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('[Form email] Resend rejected submission:', response.status, details);
      return { status: 502, body: { ok: false, message: 'We could not send your message right now. Please try again shortly.' } };
    }

    return { status: 200, body: { ok: true } };
  } catch (error) {
    console.error('[Form email] Delivery request failed:', error);
    return { status: 502, body: { ok: false, message: 'We could not send your message right now. Please try again shortly.' } };
  }
}
