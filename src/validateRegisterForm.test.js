'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  const RESULT = {
    CORRECT: {
      code: 200,
      message: 'Email and password are valid.',
    },
    PASSWORD_INVALID: {
      code: 422,
      message: 'Password is invalid.',
    },
    EMAIL_INVALID: {
      code: 422,
      message: 'Email is invalid.',
    },
    NOT_CORRECT: {
      code: 500,
      message: 'Password and email are invalid.',
    },
  };

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid).toEqual(RESULT.CORRECT);
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword).toEqual(RESULT.PASSWORD_INVALID);
  });

  it(`should return error for valid password and email without '@'`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail).toEqual(RESULT.EMAIL_INVALID);
  });

  it(`should return error for valid email and password.length < 8`, () => {
    const result1 = validateRegisterForm('test@mail.com', '');
    const result2 = validateRegisterForm('test@mail.com', 'passwor');

    expect(result1).toEqual(RESULT.PASSWORD_INVALID);
    expect(result2).toEqual(RESULT.PASSWORD_INVALID);
  });

  it(`should return error if email begins with '.'`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result).toEqual(RESULT.EMAIL_INVALID);
  });

  it('should return error if the email and password are incorrect', () => {
    const result = validateRegisterForm('.test@mail.com', 'p@ssw!');

    expect(result).toEqual(RESULT.NOT_CORRECT);
  });

  it('should return error if the email and password are empty', () => {
    const result = validateRegisterForm('', 'p@');

    expect(result).toEqual(RESULT.NOT_CORRECT);
  });

  it(`should return error for valid email and`
    + ` password without capital letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(result).toEqual(RESULT.PASSWORD_INVALID);
  });

  it(`should return error for valid password and`
    + ` email includes double dots`, () => {
    const result = validateRegisterForm('tes:t@mail.com', 'P@ssword1!');

    expect(result).toEqual(RESULT.EMAIL_INVALID);
  });
});
