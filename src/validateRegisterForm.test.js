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

  it(`should return error for valid email and password
   without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and 
  password without a special character`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password
   without an uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for invalid email`, () => {
    const result = validateRegisterForm('test@com', 'P@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email with
   consecutive dots`, () => {
    const result = validateRegisterForm('test..@mail.com', 'P@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email with 
  leading dot`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email
   with invalid characters`, () => {
    const result = validateRegisterForm('test!mail.com', 'P@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email 
  with missing @ symbol`, () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid 
  email with top-level domain starting with a dot`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email
   with top-level domain starting with a dot`, () => {
    const result = validateRegisterForm('test@.mail.com', 'P@ssword1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for both invalid email
   and password`, () => {
    const result = validateRegisterForm('test@com', 'ssword1');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });
});
