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

  it(`should accept password with Cyrillic characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@впваЇЭw1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should accept password with length 8-16 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@впваЇЭw1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should reject password with disallowed letters', () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@s1swor٦ پیت',
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should reject password shorter than 8 characters', () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@s1swo');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should reject password longer than 16 characters', () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@s1swokljuygftre',
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for valid email if password without didgit', () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@sswokljuy',
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for valid email if password without uppercase letter', () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'p@sswokljuy1',
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should reject password without special character', () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'pAsswokljuy1',
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for email without "@"`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password if email address starts with '.'`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password if email address ends with '.'`, () => {
    const invalidEmail = validateRegisterForm('test@mail.com.', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password if email address contains '..'`, () => {
    const invalidEmail = validateRegisterForm('te:st@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error if email and pssword are invalid`, () => {
    const invalidEmail = validateRegisterForm('testmail..com', 'Pssword!');

    expect(invalidEmail.code).toBe(500);
    expect(invalidEmail.message).toBe('Password and email are invalid.');
  });

  it('should return error without a valid top-level domain', () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  })
});
