'use strict';

/**
 * @param {string} email
 *
 * @param {string} password
 *
 * @returns {object}
 */
function validateRegisterForm(email, password) {
  // eslint-disable-next-line max-len
  const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;

  // eslint-disable-next-line max-len
  const validEmail = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\./i);

  let isValidEmail = email
    ? email.match(validEmail)
    : false;
  const isValidPassword = password
    ? password.match(validPassword)
    : false;

  const emailTopDomain = function() {
    const index = email.lastIndexOf(isValidEmail[2]) + isValidEmail[2].length;
    const isStartWithDot = email.startsWith('.', index + 1);
    const isEndWithDot = email.endsWith('.');
    const isCorrect = !isStartWithDot && !isEndWithDot;

    if (!isCorrect) {
      isValidEmail = false;
    }
  };

  if (isValidEmail instanceof Array && isValidEmail[2] !== undefined) {
    emailTopDomain();
  }

  if (!isValidEmail && isValidPassword) {
    return {
      code: 422, message: 'Email is invalid.',
    };
  }

  if (isValidEmail && !isValidPassword) {
    return {
      code: 422, message: 'Password is invalid.',
    };
  }

  if (!isValidEmail && !isValidPassword) {
    return {
      code: 500, message: 'Password and email are invalid.',
    };
  }

  return {
    code: 200, message: 'Email and password are valid.',
  };
}

module.exports = validateRegisterForm;
