const pendingForms = new WeakSet();
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const FORM_SUBJECTS = {
  contact: 'HOL Foundation website contact message',
  job: 'HOL Foundation job application',
  internship: 'HOL Foundation internship application',
  volunteer: 'HOL Foundation volunteer application',
};

export function buildWeb3FormsPayload(type, fields, website, accessKey) {
  if (!FORM_SUBJECTS[type]) throw new Error('This form type is not supported.');
  const name = typeof fields.name === 'string' ? fields.name.trim() : '';
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, String(value));
  });
  formData.append('access_key', accessKey);
  formData.append('subject', `${FORM_SUBJECTS[type]}${name ? ` from ${name.slice(0, 100)}` : ''}`);
  formData.append('from_name', 'HOL Foundation Website');
  formData.append('botcheck', website || '');
  return formData;
}

export function getWeb3FormsError(response, result, accessKey) {
  const detail = result?.message || result?.body?.message || result?.error || result?.body?.error;
  const fallback = response.status === 429
    ? 'Too many form submissions. Please wait and try again.'
    : 'We could not send your message right now. Please try again.';
  const message = typeof detail === 'string' && detail.trim() ? detail.trim() : fallback;
  return accessKey ? message.split(accessKey).join('[hidden]') : message;
}

export async function sendFormSubmission(type, fields, formElement, configuredAccessKey) {
  if (formElement && pendingForms.has(formElement)) {
    throw new Error('This form is already being submitted.');
  }
  if (formElement) pendingForms.add(formElement);

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 20000);

  try {
    const accessKey = configuredAccessKey ?? import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY ?? '';
    if (!accessKey) {
      throw new Error('Form email is not configured. Please try again later.');
    }
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: buildWeb3FormsPayload(
        type,
        fields,
        formElement?.elements?._honey?.value || '',
        accessKey,
      ),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success !== true) {
      throw new Error(getWeb3FormsError(response, result, accessKey));
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
