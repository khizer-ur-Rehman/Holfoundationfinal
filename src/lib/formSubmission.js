const FORM_SUBMIT_EMAIL = 'info@holwelfare.org';
const FORM_SUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`;
const pendingForms = new WeakSet();

const formSubjects = {
  contact: 'HOL Foundation website contact',
  job: 'HOL Foundation job application',
  internship: 'HOL Foundation internship application',
  volunteer: 'HOL Foundation volunteer application',
};

export async function sendFormSubmission(type, fields, formElement) {
  if (formElement && pendingForms.has(formElement)) {
    throw new Error('This form is already being submitted.');
  }
  if (formElement) pendingForms.add(formElement);

  try {
    const { intro, ...namedFields } = fields;
    const payload = {
      ...namedFields,
      ...(intro === undefined ? {} : { introduction: intro }),
      Form: formSubjects[type] || type,
      _subject: formSubjects[type] || 'HOL Foundation website submission',
      _template: 'table',
      _replyto: fields.email || '',
      _cc: 'sameer@iterativelab.pk',
      _honey: formElement?.elements?._honey?.value || '',
      _url: window.location.href,
    };
    const response = await fetch(FORM_SUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok || ![true, 'true'].includes(result.success)) {
      const providerMessage = String(result.message || '');
      if (/activat/i.test(providerMessage)) {
        throw new Error('FormSubmit email activation is pending. Check info@holwelfare.org inbox and spam for its activation email, activate the form, then submit again.');
      }
      throw new Error(providerMessage || 'We could not send your message right now. Please try again.');
    }

    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('We could not reach the form service. Please check your connection and try again.');
    }
    throw error;
  } finally {
    if (formElement) pendingForms.delete(formElement);
  }
}
