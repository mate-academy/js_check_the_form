'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe(
      'object'
    );
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without digit`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`
    should return error for valid email and password without special character
  `, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`
    should return error for valid email and password without uppercase letter
  `, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`
    should return error for valid email and password that is too short
  `, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ss1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`
    should return error for valid email and password that is too long
  `, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword12345678!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`
    should return error for valid password and email that starts from '.'
  `, () => {
    const invalidPassword = validateRegisterForm(
      '.test@mail.com',
      'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`
    should return error for valid password and email that has '..' in it
  `, () => {
    const invalidPassword = validateRegisterForm(
      'test..name@mail.com',
      'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`
    should return error for valid password and email that has top domain name
    starting from '.'
  `, () => {
    const invalidPassword = validateRegisterForm(
      'test.name@.mail.com',
      'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`
    should return error for valid password and email that has no '@' character
  `, () => {
    const invalidPassword = validateRegisterForm(
      'test.namemail.com',
      'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`
    should return error for valid password
    and email that has no domain name in it
  `, () => {
    const invalidPassword = validateRegisterForm('test.name@com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`
    should return error for invalid password and invallid email
  `, () => {
    const invalidPassword = validateRegisterForm(
      'test.namemail.com',
      'P@ssword!'
    );

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
