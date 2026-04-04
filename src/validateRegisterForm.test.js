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

  it(`should return error for password longer than 16 characters`, () => {
    const longPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword123456789!',
    );

    expect(longPassword.code).toBe(422);
    expect(longPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password without special character`, () => {
    const noSpecialChar = validateRegisterForm('test@mail.com', 'Password1');

    expect(noSpecialChar.code).toBe(422);
    expect(noSpecialChar.message).toBe('Password is invalid.');
  });

  it(`should return success for valid password with Cyrillic letters`, () => {
    const validCyrillicPassword = validateRegisterForm(
      'test@mail.com',
      'Пароль1!',
    );

    expect(validCyrillicPassword.code).toBe(200);

    expect(validCyrillicPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for email without @ symbol`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email starting with dot`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email ending with dot before @`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return success for valid email with allowed special characters`, () => {
    const validEmail = validateRegisterForm('test+qa@mail.com', 'P@ssword1!');

    expect(validEmail.code).toBe(200);

    expect(validEmail.message).toBe('Email and password are valid.');
  });

  it(`should return error for email ending with dot`, () => {
    const invalidEmail = validateRegisterForm('test@mail.com.', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
});
