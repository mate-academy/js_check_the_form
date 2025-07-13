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

  it(`should return error for valid email and password without letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', '1@23456');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
    password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
    password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
    password with 17 characters`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com', 'P@ssword1234rty!$');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
    password with 7 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswor');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and
    email without English letters`, () => {
    const invalidEmail = validateRegisterForm('фіва@мить.кен', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email without character`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email with a character at the start`, () => {
    const invalidEmail = validateRegisterForm('!est@mail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email ending with a dot`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email with a character one after the other`, () => {
    const invalidEmail = validateRegisterForm('test@£mail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email with a dot at the beginning`, () => {
    const invalidEmail = validateRegisterForm('.est@mail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email with a double dots`, () => {
    const invalidEmail = validateRegisterForm('test@mail:com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for the invalid input`, () => {
    const inValid = validateRegisterForm('testmail.com', 'P@sswo!');

    expect(inValid.code).toBe(500);
    expect(inValid.message).toBe('Password and email are invalid.');
  });
  // write more tests here
});
