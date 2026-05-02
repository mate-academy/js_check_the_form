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

  it(`should return error for password shorter than 8 chars`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@12');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password longer than 16 chars`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword12345678!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without special character`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password12');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword12');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return success for password with Cyrillic letters`, () => {
    const result = validateRegisterForm('test@mail.com', 'П@ссword12');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return error for email without @`, () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email starting with dot`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email ending with dot`, () => {
    const result = validateRegisterForm('test@mail.com.', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email with double dots`, () => {
    const result = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email with non-English characters`, () => {
    const result = validateRegisterForm('ф@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return success for email with allowed special characters`, () => {
    const result = validateRegisterForm('user+tag@mail.com', 'P@ssword1!');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return error for both invalid email and password`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });
});
