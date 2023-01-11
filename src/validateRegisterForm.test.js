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
    const isValid = validateRegisterForm('test7@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test7@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // write more tests here
  it(`should return error for valid email and 
  password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test7@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
  password without special character`, () => {
    const invalidPassword = validateRegisterForm('test7@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
  password with 7 characters`, () => {
    const invalidPassword = validateRegisterForm('test7@mail.com', 'P@sswo1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
  password with 17 characters`, () => {
    const invalidPassword = validateRegisterForm('test7@mail.com',
      'P@ssword123456789');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the valid email
  and password with non-Latin letter 'ф'`, () => {
    const isValid = validateRegisterForm('test7@mail.com', 'P@ssфord1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for email without '@' and valid password`, () => {
    const invalidPassword = validateRegisterForm('test7mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email with non-Latin letter
  and valid password`, () => {
    const invalidPassword = validateRegisterForm('teзt7@mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email with forbidden character
  and valid password`, () => {
    const invalidPassword = validateRegisterForm('test%7@mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email that starts with the dot
  and valid password`, () => {
    const invalidPassword = validateRegisterForm('.test7@mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email with double dots
  and valid password`, () => {
    const invalidPassword = validateRegisterForm('te..st7@mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email where domain starts with the dot
  and valid password`, () => {
    const invalidPassword = validateRegisterForm('test7@.mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email without top domain
  and valid password`, () => {
    const invalidPassword = validateRegisterForm('test7@mail',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error '500' for invalid email
  and invalid password`, () => {
    const invalidPassword = validateRegisterForm('test#7@mail.com',
      'P@s1');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
