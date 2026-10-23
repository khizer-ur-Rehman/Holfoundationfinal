export const EMAIL_VALIDATION_ERROR = 'Please enter a valid email address.';
export const PAKISTANI_MOBILE_VALIDATION_ERROR = 'Please enter a valid Pakistani mobile number.';

const EMAIL_LOCAL_PART = /^[A-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/i;
const EMAIL_DOMAIN_LABEL = /^[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?$/i;
const PAKISTANI_MOBILE = /^(?:03\d{9}|\+923\d{9})$/;

export function isValidEmail(value) {
  const email = typeof value === 'string' ? value.trim() : '';
  if (!email || email.length > 254) return false;

  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex !== email.lastIndexOf('@')) return false;

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  if (
    localPart.length > 64
    || localPart.startsWith('.')
    || localPart.endsWith('.')
    || localPart.includes('..')
    || !EMAIL_LOCAL_PART.test(localPart)
  ) return false;

  const labels = domain.split('.');
  return labels.length > 1
    && labels.every((label) => label.length > 0 && label.length <= 63 && EMAIL_DOMAIN_LABEL.test(label))
    && labels.at(-1).length >= 2;
}

export function isValidPakistaniMobile(value) {
  const phone = typeof value === 'string' ? value.trim() : '';
  return PAKISTANI_MOBILE.test(phone);
}

export function getPakistaniContactValidationError({ email, phone }) {
  if (!isValidEmail(email)) return EMAIL_VALIDATION_ERROR;
  if (typeof phone === 'string' && phone.trim() && !isValidPakistaniMobile(phone)) {
    return PAKISTANI_MOBILE_VALIDATION_ERROR;
  }
  return '';
}

export function validatePakistaniContactForm(form, fields) {
  const emailInput = form.elements.namedItem('email');
  const phoneInput = form.elements.namedItem('phone');
  const error = getPakistaniContactValidationError(fields);

  emailInput?.setCustomValidity(isValidEmail(fields.email) ? '' : EMAIL_VALIDATION_ERROR);
  phoneInput?.setCustomValidity(
    typeof fields.phone === 'string' && fields.phone.trim() && !isValidPakistaniMobile(fields.phone)
      ? PAKISTANI_MOBILE_VALIDATION_ERROR
      : '',
  );

  return { error, valid: form.reportValidity() };
}
