'use strict';

describe('Function validateRegisterForm:', () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it('should be declared', () => {
    expect(validateRegisterForm)
      .toBeInstanceOf(Function);
  });

  it('should return object', () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it('should return success message for the valid input', () => {
    const isValid = validateRegisterForm('test123@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('should return error for valid email, '
    + 'but password without at least 1 number', () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for valid email, '
    + 'but password without at least 1 special character', () => {
    const invalidPassword = validateRegisterForm('test123@mail.com',
      'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for valid email, '
    + 'but password without at least 1 uppercase character', () => {
    const invalidPassword = validateRegisterForm('test123@mail.com',
      'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for valid email '
    + 'and password, but password length 7', () => {
    const invalidPassword = validateRegisterForm('test123@mail.com', 'Pass1!!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for valid email and password, '
    + 'but password length 17', () => {
    const invalidPassword = validateRegisterForm('test123@mail.com',
      'P@ssword123456789');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return success message for valid '
    + 'email but password length 8', () => {
    const isValid = validateRegisterForm('test123@mail.com', 'P@sswor1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('should return success message for valid email and password, '
    + 'but password length 16', () => {
    const isValid = validateRegisterForm('test123@mail.com',
      'Password@2345678');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('should return success message for valid email '
    + 'and password, which containing at least 1 cyrillic character', () => {
    const isValid = validateRegisterForm('test123@mail.com', 'ПарольPass#12');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('should return error for valid password, '
    + 'but email containing 1 cyrillic char', () => {
    const invalidEmail = validateRegisterForm('Тестtest12@mail.com',
      'P@ssword12!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for valid password, '
    + 'but email with no personal_info', () => {
    const invalidEmail = validateRegisterForm('@mail.com', 'P@ssword12!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for valid password, '
    + 'but email with no domain', () => {
    const invalidEmail = validateRegisterForm('Тестtest12@mail', 'P@ssword12!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for valid password, '
    + 'but email starts with "." symbol', () => {
    const invalidEmail = validateRegisterForm('.test12@mail.com',
      'P@ssword12!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for valid password, '
    + 'but email containing "." symbol one by another', () => {
    const invalidEmail = validateRegisterForm('t..est12@mail.com',
      'P@ssword12!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for valid password, '
    + 'but email with no "@" symbol', () => {
    const invalidEmail = validateRegisterForm('test12mail.com', 'P@ssword12!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for valid password, '
    + 'but email with "." after "@" symbol', () => {
    const invalidEmail = validateRegisterForm('test12@.com', 'P@ssword12!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for valid password, '
    + 'but email without "." before domain', () => {
    const invalidEmail = validateRegisterForm('test12@com', 'P@ssword12!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for invalid password and invalid email', () => {
    const invalidBoth = validateRegisterForm('tes..t12@mail.com.', 'password');

    expect(invalidBoth.code).toBe(500);
    expect(invalidBoth.message).toBe('Password and email are invalid.');
  });
});
