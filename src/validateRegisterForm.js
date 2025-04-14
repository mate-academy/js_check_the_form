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
  const validEmailMask = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\./i);

  if (!email.match(validEmailMask) && password.match(validPassword)) {
    return {
      code: 422, message: 'Email is invalid.',
    };
  }

  if (email.match(validEmailMask) && !password.match(validPassword)) {
    return {
      code: 422, message: 'Password is invalid.',
    };
  }

  if (!email.match(validEmailMask) && !password.match(validPassword)) {
    return {
      code: 500, message: 'Password and email are invalid.',
    };
  }

  return {
    code: 200, message: 'Email and password are valid.',
  };
}

module.exports = { validateRegisterForm };
