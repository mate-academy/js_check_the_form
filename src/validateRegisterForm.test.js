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

  it(`should return error for invalid email and valid password`, () => {
    const invalidPassword = validateRegisterForm('test@com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and invalid password`, () => {
    const invalidPassword = validateRegisterForm('test@com', 'ssword1');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });

  it(`should return error for a long password`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com', 'FullST@CKDevel0pment'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for a short password`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com', 'A1!d'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for a password missing an uppercase letter`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com', 'password1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for a password missing a special character`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com', 'Password123'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for an email that starts with a dot`, () => {
    const invalidPassword = validateRegisterForm(
      '.test@mail.com', 'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return success message for an email
    that ends with a dot`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com.', 'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for an email that misses @`, () => {
    const invalidPassword = validateRegisterForm(
      '.testmail.com', 'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for an email,
    domain of which starts with a dot`, () => {
    const invalidPassword = validateRegisterForm(
      'test@.mail.com', 'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for an email including double dots`, () => {
    const invalidPassword = validateRegisterForm(
      'test..test@mail.com', 'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for a password
    created using cyrillic characters`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com', 'М1йПароль1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // possibly more tests needed
  // although the task gives a hint not to focus on edge cases
});
