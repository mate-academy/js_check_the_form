/* eslint-disable max-len */
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

  it(`should return error for valid password and invalid email`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error when both email and password are invalid`, () => {
    const invalidBoth = validateRegisterForm('invalid@', 'pass');

    expect(invalidBoth.code).toBe(500);
    expect(invalidBoth.message).toBe('Password and email are invalid.');
  });

  it(`should return error for password without special character`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password with less than 8 characters`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@1a');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password with more than 16 characters`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1IsTooLong!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return valid response for email with allowed special characters`, () => {
    const result = validateRegisterForm('user+tag@mail-domain.com', 'A@bcd123!');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });
});
