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

  it(`should return error for valid email and
    password less than 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ord1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
  password more than 16 characters `, () => {
    const invalidPassword
      = validateRegisterForm('test@mail.com', 'P@sssssssssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password without special character`, () => {
    const invalidPassword
      = validateRegisterForm('test@mail.com', 'Passsword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password without 1 uppercase letter`, () => {
    const invalidPassword
      = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password
  and email with dot as first character`, () => {
    const invalidPassword
      = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email with dot as last character`, () => {
    const invalidPassword
      = validateRegisterForm('test.@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return success message for the valid password and
    email with digits`, () => {
    const invalidPassword
      = validateRegisterForm('test9@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password
  and email without @`, () => {
    const invalidPassword
      = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });
});
