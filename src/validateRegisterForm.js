'use strict';

/**
 * @param {string} email
 *
 * @param {string} password
 *
 * @returns {object}
 */
function validateRegisterForm(email, password) {
  const validPassword =
    // eslint-disable-next-line max-len
    /^(?=.*\d)(?=.*[a-zа-яёіїєґ])(?=.*[A-ZА-ЯЁІЇЄҐ])(?=.*[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9])(?!.*\s).{8,16}$/;

  const validEmailMask =
    // eslint-disable-next-line max-len
    /^([a-zA-Z0-9!#$%&'*+/=?^`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^`{|}~-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.[a-zA-Z]{2,}$/i;

  if (!email.match(validEmailMask) && password.match(validPassword)) {
    return {
      code: 422,
      message: 'Email is invalid.',
    };
  }

  if (email.match(validEmailMask) && !password.match(validPassword)) {
    return {
      code: 422,
      message: 'Password is invalid.',
    };
  }

  if (!email.match(validEmailMask) && !password.match(validPassword)) {
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
