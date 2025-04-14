'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return success message for the valid inputs`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  // Паролі: довжина
  it('should return 422 for password shorter than 8 characters', () => {
    const result = validateRegisterForm('test@mail.com', 'P@ss1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return 422 for password longer than 16 characters', () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1234567890!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return 422 for password without a digit', () => {
    const result = validateRegisterForm('test@mail.com', 'Password!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return 422 for password without a special symbol', () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return 422 for password without an uppercase letter', () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return 200 if password contains valid Cyrillic characters', () => {
    const result = validateRegisterForm('test@mail.com', 'П@роль123');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it('should return 422 if email does not contain "@" symbol', () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it('should return 422 if email starts with a dot', () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it('should return 422 if email contains double dots', () => {
    const result = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it('should return 422 if email contains штvalid special characters', () => {
    const result = validateRegisterForm('user#test@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });
});
