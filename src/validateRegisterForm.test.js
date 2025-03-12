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
    const result = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without a digit`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return error for invalid email with valid password', () => {
    const result = validateRegisterForm('test@com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid password
    if missing special character`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for invalid password
    if missing uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return error for invalid password if too short', () => {
    const result = validateRegisterForm('test@mail.com', 'P@ss1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return error for invalid password if too long', () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword123456789');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should return error for both invalid email and password', () => {
    const result = validateRegisterForm('test@com', 'ssword1');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });
});
