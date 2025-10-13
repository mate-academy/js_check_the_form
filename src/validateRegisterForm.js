'use strict';

/**
 * @param {string} email
 * @param {string} password
 * @returns {object}
 */
function validateRegisterForm(email, password) {
  // Regex dla hasła (częściowe rozbicie)
  const reNum = '(?=.*\\d)';
  const reLower = '(?=.*[a-z])';
  const reUpper = '(?=.*[A-Z])';
  const reSpecial = '(?=.*[^a-zA-Z0-9])';
  const reNoSpace = '(?!.*\\s)';
  const reLen = '.{8,16}';

  const validPassword = new RegExp(
    '^' + reNum + reLower + reUpper + reSpecial + reNoSpace + reLen + '$'
  );

  // Regex dla emaila (części)
  const reLocal = '([\\w-]+(?:\\.[\\w-]+)*)';
  const reDomain = '([\\w-]+(?:\\.[\\w-]+)+)'; // + wymusza co najmniej jedną kropkę
  const reAt = '@';
  const emailRegex = new RegExp('^' + reLocal + reAt + reDomain + '$', 'i');

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = validPassword.test(password);

  // Dodatkowe reguły dla emaila
  let emailExtraValid = true;
  if (isEmailValid) {
    const [local, domain] = email.split('@');
    if (
      local.startsWith('.') ||
      domain.startsWith('.') ||
      email.includes('..')
    ) {
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


