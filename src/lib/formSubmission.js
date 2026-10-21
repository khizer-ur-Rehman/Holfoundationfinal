const FORM_API_URL = (import.meta.env.VITE_FORM_API_URL || '/api/send-email').replace(/\/$/, '');

export async function sendFormSubmission(type, fields, formElement) {
  const response = await fetch(FORM_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type,
      fields,
      website: formElement?.elements?.website?.value || '',
    }),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.ok) {
    throw new Error(result.message || 'We could not send your message right now. Please try again.');
  }

  return result;
}
