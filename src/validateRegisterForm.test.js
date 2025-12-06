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

  it(`should return success message for valid email 
    and password with Cyrillic letters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'ПарольAa1!');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email 
    and password with length < 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'ПльAa1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
    and password with length > 16 characters`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'dfwfwefcwqcwcwAa1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
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

  it(`should return success for email
    with allowed characters and valid password`, () => {
    const invalidEmail = validateRegisterForm('test!@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(200);
    expect(invalidEmail.message).toBe('Email and password are valid.');
  });

  it(`should return error for email
    with Cyrillic letters and valid password`, () => {
    const invalidEmail = validateRegisterForm('tesт@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with not allowed character 
    and valid password`, () => {
    const invalidEmail = validateRegisterForm('test]@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email
    without required '@' and valid password`, () => {
    const invalidEmail = validateRegisterForm('test.mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with dot 
    in the start of the first part of it and valid password`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email 
    with dot in the end of the first part of it and valid password`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email
    with double dot in the first part of it and valid password`, () => {
    const invalidEmail = validateRegisterForm(
      'test..test@mail.com',
      'Password1!'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with dot 
    in the start of top Level domain and valid password`, () => {
    const invalidEmail = validateRegisterForm('test@.mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with double dots 
    in the top Level domain and valid password`, () => {
    const invalidEmail = validateRegisterForm('test@mail..com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error when both password and email are invalid`, () => {
    const isValid = validateRegisterForm('test@com', 'ssword1');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });
});
