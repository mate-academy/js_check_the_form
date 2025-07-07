'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(
      typeof validateRegisterForm('test@mail.com', 'P@ssword1!'),
    ).toBe('object');
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
    const invalidEmail = validateRegisterForm(
      'invalid-email',
      'P@ssword1!',
    );

    expect(invalidEmail.code).toBe(422);

    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and invalid password`, () => {
    const bothInvalid = validateRegisterForm(
      'invalid-email',
      'password',
    );

    expect(bothInvalid.code).toBe(500);

    expect(bothInvalid.message).toBe('Password and email are invalid.');
  });

  it(`should return error for empty email and valid password`, () => {
    const emptyEmail = validateRegisterForm(
      '',
      'P@ssword1!',
    );

    expect(emptyEmail.code).toBe(422);

    expect(emptyEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email and empty password`, () => {
    const emptyPassword = validateRegisterForm(
      'test@mail.com',
      '',
    );

    expect(emptyPassword.code).toBe(422);

    expect(emptyPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for empty email and empty password`, () => {
    const emptyBoth = validateRegisterForm(
      '',
      '',
    );

    expect(emptyBoth.code).toBe(500);

    expect(emptyBoth.message).toBe('Password and email are invalid.');
  });

  it(`should return error if password has whitespace`, () => {
    const passwordWithSpace = validateRegisterForm(
      'test@mail.com',
      'P@ss word1!',
    );

    expect(passwordWithSpace.code).toBe(422);

    expect(passwordWithSpace.message).toBe('Password is invalid.');
  });

  it(`should return error if password is shorter than 8 characters`, () => {
    const shortPassword = validateRegisterForm(
      'test@mail.com',
      'P@1a!',
    );

    expect(shortPassword.code).toBe(422);

    expect(shortPassword.message).toBe('Password is invalid.');
  });

  it(`should return error if password is longer than 16 characters`, () => {
    const longPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword1234567890!',
    );

    expect(longPassword.code).toBe(422);

    expect(longPassword.message).toBe('Password is invalid.');
  });
});
