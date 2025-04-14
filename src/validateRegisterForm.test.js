'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return object with 2 properties: 'code' and 'message'`, () => {
    const result = validateRegisterForm('', '');

    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('message');
  });

  it(`should return 'number' and 'string' in 2 properties of object`, () => {
    const result = validateRegisterForm('', '');

    expect(typeof result.code).toBe('number');
    expect(typeof result.message).toBe('string');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without special char`,
    () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P1ssword');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

  it(`should return error for valid email and password`
    + ` without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', '@1ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and too weak password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswo1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and too long password`, () => {
    const invalidPassword
      = validateRegisterForm('test@mail.com', 'P@ssword123456789');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and`
    + ` email with non-English letters`, () => {
    const invalidPassword = validateRegisterForm('tßäö@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and`
  + ` email with unexpected '@' symbol`, () => {
    const invalidPassword = validateRegisterForm('test@m@il.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and`
    + ` email with username start with '.'`, () => {
    const invalidPassword = validateRegisterForm('.tes@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and`
    + ` email with username ends with '.'`, () => {
    const invalidPassword = validateRegisterForm('tes.@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and`
    + ` mail server starts with '.'`, () => {
    const invalidPassword = validateRegisterForm('test@.ail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and`
  + ` mail domain ends with '.'`, () => {
    const invalidPassword = validateRegisterForm('test@.mail.co.', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and`
    + ` email includes double dots`, () => {
    const invalidPassword = validateRegisterForm('t..t@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for password and email`
  + ` in case of both invalid input`, () => {
    const invalidPassword = validateRegisterForm('test@com', 'ssword1');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
