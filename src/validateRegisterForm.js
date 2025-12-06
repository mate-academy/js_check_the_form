'use strict';

/**
 * @param {string} email
 * @param {string} password
 *
 * @returns {object}
 */
function validateRegisterForm(email, password) {
  const validPassword
    = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;

  const validEmailMask
    // eslint-disable-next-line max-len
    = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

  const isEmailValid = validEmailMask.test(email);
  const isPasswordValid = validPassword.test(password);

  if (!isEmailValid && isPasswordValid) {
    return {
      code: 422,
      message: 'Email is invalid.',
    };
  }

  if (isEmailValid && !isPasswordValid) {
    return {
      code: 422,
      message: 'Password is invalid.',
    };
  }

  if (!isEmailValid && !isPasswordValid) {
    return {
      code: 500,
      message: 'Password and email are invalid.',
    };
  }

  return {
    code: 200,
    message: 'Email and password are valid.',
  };
}

module.exports = validateRegisterForm;
