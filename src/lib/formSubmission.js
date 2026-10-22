const pendingForms = new WeakSet();

export async function sendFormSubmission(type, fields, formElement) {
  if (formElement && pendingForms.has(formElement)) {
    throw new Error('This form is already being submitted.');
  }
  if (formElement) pendingForms.add(formElement);

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 20000);

  try {
    const idempotencyKey = globalThis.crypto?.randomUUID?.()
      || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const response = await fetch('/api/send-email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({
        type,
        fields,
        website: formElement?.elements?._honey?.value || '',
      }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.ok !== true) {
      throw new Error(result.message || 'We could not send your message right now. Please try again.');
    }

    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Sending took too long. Please try again.');
    }
    if (error instanceof TypeError) {
      throw new Error('We could not reach the email service. Please check your connection and try again.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    if (formElement) pendingForms.delete(formElement);
  }
}
