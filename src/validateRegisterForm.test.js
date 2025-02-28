'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe(
      'object'
    );
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

  it(`should return error for invalid email`, () => {
    const invalidEmail = validateRegisterForm('invalid-email', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for password that is too short`, () => {
    const shortPassword = validateRegisterForm('test@mail.com', 'P@1');

    expect(shortPassword.code).toBe(422);
    expect(shortPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password that is too long`, () => {
    const longPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword1234567890!'
    );

    expect(longPassword.code).toBe(422);
    expect(longPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password missing special character`, () => {
    const missingSpecialChar = validateRegisterForm(
      'test@mail.com',
      'Password1'
    );

    expect(missingSpecialChar.code).toBe(422);
    expect(missingSpecialChar.message).toBe('Password is invalid.');
  });

  it(`should return error for invalid email and valid password`, () => {
    const invalidEmailValidPassword = validateRegisterForm(
      'invalid-email',
      'P@ssword1!'
    );

    expect(invalidEmailValidPassword.code).toBe(422);
    expect(invalidEmailValidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for completely invalid email and password`, () => {
    const completelyInvalid = validateRegisterForm('invalid-email', 'invalid');

    expect(completelyInvalid.code).toBe(500);
    expect(completelyInvalid.message).toBe('Password and email are invalid.');
  });
});
