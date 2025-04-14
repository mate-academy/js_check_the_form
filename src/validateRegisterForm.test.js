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

  it(`should return error for invalid email and valid password`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and invalid password`, () => {
    const invalidEmailPassword = validateRegisterForm(
      'invalid-mail', 'wrong password');

    expect(invalidEmailPassword.code).toBe(500);

    expect(invalidEmailPassword.message).toBe(
      'Password and email are invalid.');
  });

  it(
    `should return error for 
    valid email and password without special character`,
    () => {
      const invalidEmailPassword = validateRegisterForm(
        'itest@mail.com', 'Password1');

      expect(invalidEmailPassword.code).toBe(422);

      expect(invalidEmailPassword.message).toBe(
        'Password is invalid.');
    });

  it(
    `should return error for valid email and password without uppercase letter`,
    () => {
      const invalidEmailPassword = validateRegisterForm(
        'itest@mail.com', 'p@ssword1!');

      expect(invalidEmailPassword.code).toBe(422);

      expect(invalidEmailPassword.message).toBe(
        'Password is invalid.');
    });

  it(
    `should return error for valid email and password without lowercase letter`,
    () => {
      const invalidEmailPassword = validateRegisterForm(
        'itest@mail.com', 'P@SSWORD1!');

      expect(invalidEmailPassword.code).toBe(422);

      expect(invalidEmailPassword.message).toBe(
        'Password is invalid.');
    });

  it(
    `should return error for valid email 
    and password shorter than 8 characters`,
    () => {
      const invalidEmailPassword = validateRegisterForm(
        'itest@mail.com', 'P@ss1!');

      expect(invalidEmailPassword.code).toBe(422);

      expect(invalidEmailPassword.message).toBe(
        'Password is invalid.');
    });
});
