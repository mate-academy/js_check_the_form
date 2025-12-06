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

  it('should accept password with Cyrillic letters', () => {
    const result = validateRegisterForm('test@mail.com', 'ПарольAa1!');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it('should not accept password with length < 8 characters ', () => {
    const result = validateRegisterForm('test@mail.com', 'ПльAa1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should not accept password with length > 16 characters ', () => {
    const result = validateRegisterForm('test@mail.com', 'dfwfwefcwqcwcwAa1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password 
    without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password2');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password 
    without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'password1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and email
    with Cyrillic letters`, () => {
    const invalidEmail = validateRegisterForm('tesт@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email
    with not allowed character`, () => {
    const invalidEmail = validateRegisterForm('test]@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email
    without required @`, () => {
    const invalidEmail = validateRegisterForm('test.mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email
    with dot in the start of the first part of it`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email
    with dot in the end of the first part of it`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email
    with double dot in the first part of it`, () => {
    const invalidEmail = validateRegisterForm(
      'test..test@mail.com',
      'Password1!'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email
    with dot in the start of top Level domain`, () => {
    const invalidEmail = validateRegisterForm('test@.mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return success message for the whole invalid input`, () => {
    const isValid = validateRegisterForm('test@com', 'ssword1');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });
});
