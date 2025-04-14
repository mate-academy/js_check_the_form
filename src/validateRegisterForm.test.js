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

  it(`should return an object with status 200
  for valid email and password`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssw0rd123');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return an object with status 422 for invalid email`, () => {
    const result = validateRegisterForm('testmail.com', 'P@ssw0rd123');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return an object with status 422
  for invalid password (less than 8 characters)`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ss1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return an object with status 422
   for invalid password (no special character)`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return an object with status 422
  for invalid password (no digit)`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return an object with status 422
  for invalid password (no uppercase letter)`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return an object with status code 500
  for both invalid email and password`, () => {
    const result = validateRegisterForm('testmail.com', 'P@ss');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });

  it(`should return an object with status code 422
   for an email with double dots`, () => {
    const result = validateRegisterForm('test..mail@mail.com', 'P@ssw0rd123');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return an object with status 422
  for an email starting with a dot`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssw0rd123');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return an object with status code 422
  for an email with invalid top-level domain`, () => {
    const result = validateRegisterForm('test@mail', 'P@ssw0rd123');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return an object with status code 422
   for a password longer than 16 characters`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssw0rd123456789');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return an object with status code 422
  for a password without a digit`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });
});
