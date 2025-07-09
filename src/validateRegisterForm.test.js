'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return an object`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(typeof result).toBe('object');
  });

  it(`should return success for valid email and valid password`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 200,
      message: 'Email and password are valid.',
    });
  });

  it(`should return error for valid email and invalid password`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it(`should return error for invalid email and valid password`, () => {
    const result = validateRegisterForm('test@com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it(`should return error for invalid email and invalid password`, () => {
    const result = validateRegisterForm('test@com', 'ssword1');

    expect(result).toEqual({
      code: 500,
      message: 'Password and email are invalid.',
    });
  });

  it(`should return error for email without '@'`, () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it(`should return error for email starting with dot`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it(`should return error for email with double dots`, () => {
    const result = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it(`should return error for password without uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it(`should return error for password without digit`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword!');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it(`should return error for password without special character`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it(`should return error for password that is too short`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@1a');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it(`should return error for password that is too long`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword123456789!');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });
});


