'use strict';

describe(`validateRegisterForm`, () => {
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

  it(`should return error for invalid email`, () => {
    const result = validateRegisterForm('test@com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error when both email and password are invalid`, () => {
    const result = validateRegisterForm('test@com', 'password');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });

  it(`should return error for password without uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for too short password`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@1!a');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for email with double dots`, () => {
    const result = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email starting with dot`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });
});
