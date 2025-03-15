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
  const validPassword = /^(?=.*\d)(?=.*[a-zA-Zа-яА-Я])(?=.*[A-ZА-Я])(?=.*[^a-zA-Z0-9\s]).{8,16}$/;

  // Регулярное выражение для email
  // eslint-disable-next-line max-len
  const validEmail = /^[a-zA-Z0-9](?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]*[a-zA-Z0-9])?@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  // Дополнительные проверки для email:
  // 1. Не начинается и не заканчивается точкой.
  // 2. Не содержит два подряд идущих символа точки.
  if (email.startsWith('.') || email.endsWith('.') || email.includes('..')) {
    return {
      code: 422,
      message: 'Email is invalid.',
    };
  }

  const isEmailValid = email.match(validEmail);
  const isPasswordValid = password.match(validPassword);

  if (!isEmailValid && !isPasswordValid) {
    return {
      code: 500,
      message: 'Password and email are invalid.',
    };
  }

  if (!isEmailValid) {
    return {
      code: 422,
      message: 'Email is invalid.',
    };
  }

  if (!isPasswordValid) {
    return {
      code: 422,
      message: 'Password is invalid.',
    };
  }

  return {
    code: 200,
    message: 'Email and password are valid.',
  };
}

module.exports = validateRegisterForm;
