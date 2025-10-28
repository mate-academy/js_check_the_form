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

  it(`should return error for valid email
    and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Pssword12');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for at least 8 characters inclusive`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@wod1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for max 16 characters inclusive`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword1!p234578');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for not English letters`, () => {
    const invalidPassword = validateRegisterForm('Тест@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error when @ is not added`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should pass if we have digits`, () => {
    const isValid = validateRegisterForm('test123@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should pass if we have some characters`, () => {
    const isValid = validateRegisterForm('test_nik-ch@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error when we have characters # $ % &`, () => {
    const invalidPassword = validateRegisterForm('t#es$tmyk%&@mail.com',
      'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error when double dots added`, () => {
    const invalidPassword = validateRegisterForm('test..myk@mail.com',
      'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error when email be start with .`, () => {
    const invalidPassword = validateRegisterForm('.test@mail.com',
      'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error when top Level domain can not start with dot`, () => {
    const invalidPassword = validateRegisterForm('test@.mail.com',
      'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error when don't have domain Level`, () => {
    const invalidPassword = validateRegisterForm('test@com',
      'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and password`, () => {
    const invalidPassword = validateRegisterForm('test@com', 'ssword1');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
