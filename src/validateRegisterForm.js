'use strict';

/**
 * @param {string} email
 * @param {string} password
 * @returns {object}
 */
function validateRegisterForm(email, password) {
  // Password regex: krótkie zmienne
  const n = '(?=.*\\d)';         // number
  const l = '(?=.*[a-z])';       // lowercase
  const u = '(?=.*[A-Z])';       // uppercase
  const s = '(?=.*[^a-zA-Z0-9])';// special char
  const ns = '(?!.*\\s)';        // no spaces
  const len = '.{8,16}';         // length 8-16

  const validPassword = new RegExp('^' + n + l + u + s + ns + len + '$');

  // Email regex: krótkie zmienne
  const loc = '([\\w-]+(?:\\.[\\w-]+)*)';
  const dom = '([\\w-]+(?:\\.[\\w-]+)+)'; // wymusza co najmniej jedną kropkę
  const at = '@';
  const validEmailMask = new RegExp('^' + loc + at + dom + '$', 'i');

  const isEmailValid = validEmailMask.test(email);
  const isPasswordValid = validPassword.test(password);

  // Dodatkowe reguły dla emaila
  let emailExtraValid = true;
  if (isEmailValid) {
    const [local, domain] = email.split('@');
    if (local.startsWith('.') || domain.startsWith('.') || email.includes('..')) {
      emailExtraValid = false;
    }
  }

  // Walidacja wyników
  if (!isEmailValid || !emailExtraValid) {
    if (isPasswordValid) {
      return { code: 422, message: 'Email is invalid.' };
    } else {
      return { code: 500, message: 'Password and email are invalid.' };
    }
  }

  if (!isPasswordValid) {
    return { code: 422, message: 'Password is invalid.' };
  }

  return { code: 200, message: 'Email and password are valid.' };
}

module.exports = validateRegisterForm;


