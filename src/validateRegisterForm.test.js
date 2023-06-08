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
    const isValid = validateRegisterForm('test@mail.com', 'P@ssworд1!');

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
    const invalidPassword
      = validateRegisterForm('te.st1@ma-il.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password without uppercase letter`, () => {
    const invalidPassword
      = validateRegisterForm('t.e.s.t.1@ma-il.com', 'pa$sword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password length less then 8`, () => {
    const invalidPassword
      = validateRegisterForm('testMAIL@mail.c', 'Pa$s123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password length 17`, () => {
    const invalidPassword
      = validateRegisterForm('a@a.a', 'Pa$swordPa$sword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and email without '@'`, () => {
    const invalidEmail
      = validateRegisterForm('testmail.com', '16_symbolsInHere');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
    and email starts with dot '.'`, () => {
    const invalidEmail
      = validateRegisterForm('.test@mail.com', 'SayPa$sw0rd');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
    and email with double dots '..'`, () => {
    const invalidEmail
      = validateRegisterForm('te..st@mail.com', 'SayPa$sw0rd');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
    and email if domain starts with dot '.'`, () => {
    const invalidEmail
      = validateRegisterForm('test@.com', 'Say_Hell0');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and invalid password`, () => {
    const invalidEmailPassword
      = validateRegisterForm('тест@mail.com', 'Password1');

    expect(invalidEmailPassword.code).toBe(500);

    expect(invalidEmailPassword.message)
      .toBe('Password and email are invalid.');
  });

  it(`should return error for empty email and empty password`, () => {
    const invalidEmailPassword
      = validateRegisterForm('', '');

    expect(invalidEmailPassword.code).toBe(500);

    expect(invalidEmailPassword.message)
      .toBe('Password and email are invalid.');
  });
});
