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

  it(`should return error for valid email and password without special char`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password shorter than 8 chars`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ss1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password longer than 16 chars`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1TooLong!!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for invalid email (no @) and valid password`, () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email (no TLD) and valid password`, () => {
    const result = validateRegisterForm('test@com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email (starts with dot) and valid password`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email (double dots) and valid password`, () => {
    const result = validateRegisterForm('te..st@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return 500 when both email and password are invalid`, () => {
    const result = validateRegisterForm('test@com', 'ssword1');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });

  it(`should return 500 when email has no @ and password has no digit`, () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });

  it(`should return 200 for valid email with allowed special chars`, () => {
    const result = validateRegisterForm('test+user@mail.com', 'P@ssword1!');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return 200 for valid password with Cyrillic letters`, () => {
    const result = validateRegisterForm('test@mail.com', 'Пароль1!');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });
});
