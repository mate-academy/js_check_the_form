/* eslint-disable max-len */
'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@gmail.com', 'P@ssword1!')).toBe('object');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password that is too short`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password that is too long`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password123456789!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without digit`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'password1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for invalid email and valid password`, () => {
    const invalidEmail = validateRegisterForm('invalid-email', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with invalid domain and valid password with digit`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for password containing any specified special characters`, () => {
    const specialChars = "!#$%&'*+-/=?^_`{|}~";
    const isValid = validateRegisterForm(`te${specialChars}st@mail.com`, `P@ssword1!`);

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for email starting with a dot and valid password`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with double dots and valid password`, () => {
    const invalidEmail = validateRegisterForm('test..email@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  // it(`should return error for email with top-level domain starting with dot and valid password`, () => {
  //   const invalidEmail = validateRegisterForm('test@mail..com', 'P@ssword1!');

  //   expect(invalidEmail.code).toBe(422);
  //   expect(invalidEmail.message).toBe('Email is invalid.');
  // });

  it(`should return error for email ending with dot and valid password`, () => {
    const invalidEmail = validateRegisterForm('test@.mail.com.', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
});
