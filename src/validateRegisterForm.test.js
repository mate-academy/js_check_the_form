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

  // valid data latin
  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  // valid data cyrylic Bug: The system shouldn't accepts letters `Aa-Яя`;
  it.skip(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'Абвгде1@');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  // password without a number
  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // password without an uppercase letter
  it(`should return an error for a valid email
     and password without an uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // password without a special characters
  it(`should return an error for a valid email
     and password without a special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // password length 5 symbols
  it(`should return an error for a valid email
      and password length less than 6 symbols`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // password length 17 symbols
  it(`should return an error for a valid email
      and password length more than 16 symbols`, () => {
    const invalidPassword
      = validateRegisterForm('test@mail.com', 'PasswordPasswor@1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // the email contains Cyrillic letters
  it(`should return an error for a valid password
     and the email contains Cyrillic letters`, () => {
    const invalidPassword = validateRegisterForm('тест@mail.com', 'P@sword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  // the email without '@'
  it(`should return an error for a valid password
     and the email without '@'`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@sword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  // the email top Level domain start with dot '.'
  it(`should return an error for a valid password
     and the email top Level domain can not start with dot '.'`, () => {
    const invalidPassword = validateRegisterForm('test@.mail.com', 'P@sword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  // the email with double dots
  it(`should return an error for a valid password
     and the email with double dots`, () => {
    const invalidPassword = validateRegisterForm('tes..t@mail.com', 'P@swor1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  // the email email starts with `.`
  it(`should return an error for a valid password
     and the email with double dots`, () => {
    const invalidPassword = validateRegisterForm('.test@mail.com', 'P@sword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  // the email email ending with `.`
  it(`should return an error for a valid password
     and the email with double dots`, () => {
    const invalidPassword = validateRegisterForm('test.@mail.com', 'P@sword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });
});
