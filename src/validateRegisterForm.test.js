'use strict';

const validateRegisterForm = require('./validateRegisterForm');

describe(`Function 'validateRegisterForm':`, () => {
  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return success message for the valid input`, () => {
    const result = validateRegisterForm(
      'test@mail.com',
      'P@ssword1!'
    );

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const result = validateRegisterForm(
      'test@mail.com',
      'P@ssword!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const result = validateRegisterForm(
      'testmail.com',
      'P@ssword1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email with double dots`, () => {
    const result = validateRegisterForm(
      'test..mail@mail.com',
      'P@ssword1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email starting with dot`, () => {
    const result = validateRegisterForm(
      '.test@mail.com',
      'P@ssword1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for password without special character`, () => {
    const result = validateRegisterForm(
      'test@mail.com',
      'Password1'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password shorter than 8 characters`, () => {
    const result = validateRegisterForm(
      'test@mail.com',
      'P@ss1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password longer than 16 characters`, () => {
    const result = validateRegisterForm(
      'test@mail.com',
      'P@ssword1IsTooLong!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without uppercase letter`, () => {
    const result = validateRegisterForm(
      'test@mail.com',
      'p@ssword1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error when both email and password are invalid`, () => {
    const result = validateRegisterForm(
      'invalid_email',
      'password'
    );

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });

  it(`should return error when email is missing top-level domain`, () => {
    const result = validateRegisterForm(
      'test@mail',
      'P@ssword1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return valid response for Cyrillic letters in password`, () => {
    const result = validateRegisterForm(
      'test@mail.com',
      'І@Password1'
    );

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });
});
