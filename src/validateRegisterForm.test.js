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

  // write more tests here

  it(`should return error for valid email
  and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password23');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword23');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password length of 6 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ss23');

    expect(invalidPassword.code).toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password length of 18 characters`, () => {
    const invalidPassword
    = validateRegisterForm('test@mail.com', 'P@sswordtolong2345');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error message for the valid
  email and password with cyrillic letters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'Пaроль789!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return success message for the valid
  password and email with digits and uppercase letters`, () => {
    const isValid = validateRegisterForm('Te123St@mail.com', 'Password1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password
  and email without '@' symbol`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'Password1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email that starts with '.'`, () => {
    const invalidPassword
    = validateRegisterForm('.test@mail.com', 'Password1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email that ends with '.'`, () => {
    const invalidPassword
    = validateRegisterForm('test.@mail.com', 'Password1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email that contain double dots`, () => {
    const invalidPassword
    = validateRegisterForm('t:est@mail.com', 'Password1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email domain that starts with '.'`, () => {
    const invalidPassword
    = validateRegisterForm('test@.mail.com', 'Password1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid password and email`, () => {
    const invalidPassword
    = validateRegisterForm('t#e!s&t@mail.com', 'password');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
