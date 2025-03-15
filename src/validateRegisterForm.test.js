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

  // eslint-disable-next-line max-len
  it(`should return error for valid email and password without special character`, () => {
    // eslint-disable-next-line max-len
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error for valid email and password without uppercase letter`, () => {
    // eslint-disable-next-line max-len
    const invalidPassword = validateRegisterForm('test@mail.com', 'password123!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without digit`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for email with consecutive dots`, () => {
    // eslint-disable-next-line max-len
    const invalidEmail = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email starting with a dot`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email ending with a dot`, () => {
    // eslint-disable-next-line max-len
    const invalidEmail = validateRegisterForm('test@mail.com.', 'P@ssword1!'); // исправлено: добавлен пароль

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email without top-level domain`, () => {
    const invalidEmail = validateRegisterForm('test@mail', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with multiple dots in domain`, () => {
    const invalidEmail = validateRegisterForm('test@mai.l..com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for password less than 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Pass1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password more than 16 characters`, () => {
    // eslint-disable-next-line max-len
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword1234567890!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for email with no "@" symbol`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with invalid character in domain`, () => {
    const invalidEmail = validateRegisterForm('test@mail#.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for both invalid email and password`, () => {
    const invalidData = validateRegisterForm('test@com', 'ssword1');

    expect(invalidData.code).toBe(500);
    expect(invalidData.message).toBe('Password and email are invalid.');
  });
});
