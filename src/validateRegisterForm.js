'use strict';

/**
 * @param {string} password
 * @param {string} email
 * @returns {object}
 */
function validateRegisterForm(password, email) {
  // Password regex
  const n = '(?=.*\\d)';
  const l = '(?=.*[a-zA-Z\u0400-\u04FF])';
  const u = '(?=.*[A-Z\u0400-\u04FF])';
  const s = '(?=.*[^\\da-zA-Z\u0400-\u04FF])';
  const ns = '(?!.*\\s)';
  const len = '.{8,16}';

  const pwdPattern = '^' + n + l + u + s + ns + len + '$';
  const validPassword = new RegExp(pwdPattern, 'u');

  // Email regex (local-part + domain)
  const localChars = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+";
  const loc = '(' + localChars + '(?:\\.' + localChars + ')*)';
  const domLabel = '[A-Za-z0-9-]+';
  const dom = '(' + domLabel + '(?:\\.' + domLabel + ')+)';
  const at = '@';
  const validEmailMask = new RegExp('^' + loc + at + dom + '$', 'i');

  const isEmailValid = validEmailMask.test(email);
  const isPasswordValid = validPassword.test(password);

  // Extra dot rules
  let emailExtraValid = true;
  if (isEmailValid) {
    const parts = email.split('@');
    const local = parts[0];
    const domain = parts[1];

    const localInvalid = local.startsWith('.');
    const domainInvalid = domain.startsWith('.');
    const dotsInvalid = email.includes('..');

    if (localInvalid || domainInvalid || dotsInvalid) {
      emailExtraValid = false;
    }
  }

  // Result mapping
  if (!isEmailValid || !emailExtraValid) {
    if (isPasswordValid) {
      return { code: 422, message: 'Email is invalid.' };
    }
    return { code: 500, message: 'Password and email are invalid.' };
  }

  if (!isPasswordValid) {
    return { code: 422, message: 'Password is invalid.' };
  }

  return { code: 200, message: 'Email and password are valid.' };
}

module.exports = validateRegisterForm;

