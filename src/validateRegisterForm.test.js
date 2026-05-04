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

  it(`should return error for valid email and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password length less than 8 or more than 16`, () => {
    const shortPassword = validateRegisterForm('test@mail.com', 'P@wrd1!');
    const longPassword = validateRegisterForm(
      'test@mail.com',
      'P@sswooooooooord1!',
    );

    expect(shortPassword.code).toBe(422);
    expect(shortPassword.message).toBe('Password is invalid.');
    expect(longPassword.code).toBe(422);
    expect(longPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and email without '@'`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email start with '.'`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email contains double dots '..'`, () => {
    const invalidEmail = validateRegisterForm('test@mail..com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email without second level domain or top level domain without dot`, () => {
    const invalidSLDEmail = validateRegisterForm('test@com', 'P@ssword1!');
    const invalidTLDEmail = validateRegisterForm('test@mailcom', 'P@ssword1!');

    expect(invalidSLDEmail.code).toBe(422);
    expect(invalidSLDEmail.message).toBe('Email is invalid.');
    expect(invalidTLDEmail.code).toBe(422);
    expect(invalidTLDEmail.message).toBe('Email is invalid.');
  });

  it(`should return error message for the invalid input`, () => {
    const isInvalid = validateRegisterForm('test@com', 'ssword1');

    expect(isInvalid.code).toBe(500);
    expect(isInvalid.message).toBe('Password and email are invalid.');
  });
});
