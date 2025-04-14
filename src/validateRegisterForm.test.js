'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(validateRegisterForm('', '')).toBeInstanceOf(Object);
  });

  it(`'password' should contain letters Aa-Zz and may contain Aa-Яя`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'Пароль1.Word');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error when 'password' not contain 8-16 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'passwor');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error when 'password' not contain`
     + `1 digit, 1 special character, 1 uppercase letter.`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'password');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error when 'email' not contain english letters Aa-Zz`,
    () => {
      const isValid = validateRegisterForm('Тест@mail.com', 'Password1!');

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });

  it(`should return error when 'email' not contain @`,
    () => {
      const isValid = validateRegisterForm('testmail.com', 'Password1!');

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });

  it('should return error when email contains special characters '
    + '"! # $ % & \' * + - / = ? ^ _ ` { | } ~"', () => {
    const isValid = validateRegisterForm('+test?*$}@mail.com', 'Password1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error when 'email' contain '.' as a first or last character`
    + `and it isn't come one after the other.`,
  () => {
    const isValid = validateRegisterForm('..test.@mail.com', 'Password1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it('should accept an email with digits and a valid password', () => {
    const isValid = validateRegisterForm('test123@mail.com', 'Password1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('should return error when top level domain not starts with a dot', () => {
    const isValid = validateRegisterForm('test@mailcom', 'Password1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'Password1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error when input and password aren't valid`, () => {
    const isValid = validateRegisterForm('test@com', 'ssword1');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });
});
