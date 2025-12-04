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
  const validPassword = /^(?=.*\d)(?=.*[A-ZА-Я])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-zа-яA-ZА-Я])[A-Za-zА-Яа-я\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

  // eslint-disable-next-line max-len
  const validEmailMask = /^[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+(\.[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z][A-Za-z0-9-]*$/;

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

module.exports = validateRegisterForm;
