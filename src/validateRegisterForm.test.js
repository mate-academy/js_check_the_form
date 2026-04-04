'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe(
      'object',
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

  it(`should return error for invalid email and valid password`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and invalid password`, () => {
    const invalidBoth = validateRegisterForm('test@com', 'password');

    expect(invalidBoth.code).toBe(500);

    expect(invalidBoth.message).toBe('Password and email are invalid.');
  });

  it(`should return error for password shorter than 8 characters`, () => {
    const shortPassword = validateRegisterForm('test@mail.com', 'P@ss1!');

    expect(shortPassword.code).toBe(422);
    expect(shortPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password without uppercase letter`, () => {
    const noUppercase = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(noUppercase.code).toBe(422);
    expect(noUppercase.message).toBe('Password is invalid.');
  });

  it(`should return error for email with double dots`, () => {
    const invalidEmail = validateRegisterForm(
      'test..mail@mail.com',
      'P@ssword1!',
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
});
