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

  // Invalid email only
  it(`should return error for invalid email and valid password`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1!');
    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email with double dots`, () => {
    const invalidEmail = validateRegisterForm('user..name@mail.com', 'Abc123$def');
    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  // Both email and password invalid
  it(`should return error when both email and password are invalid`, () => {
    const bothInvalid = validateRegisterForm('test@com', 'ssword1');
    expect(bothInvalid.code).toBe(500);
    expect(bothInvalid.message).toBe('Password and email are invalid.');
  });

  it(`should return error when both email and password are clearly invalid`, () => {
    const bothInvalid = validateRegisterForm('user..mail', 'abc');
    expect(bothInvalid.code).toBe(500);
    expect(bothInvalid.message).toBe('Password and email are invalid.');
  });

  // Optional: password length
  it(`should return error if password is too short`, () => {
    const shortPassword = validateRegisterForm('test@mail.com', 'A1$a');
    expect(shortPassword.code).toBe(422);
    expect(shortPassword.message).toBe('Password is invalid.');
  });

  it(`should return error if password is too long`, () => {
    const longPassword = validateRegisterForm('test@mail.com', 'A1$aaaaaaaaaaaaaaa'); // 17 chars
    expect(longPassword.code).toBe(422);
    expect(longPassword.message).toBe('Password is invalid.');
  });
});
