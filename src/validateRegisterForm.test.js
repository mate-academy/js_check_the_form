'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const invaildEmail = {
    code: 422,
    message: 'Email is invalid.',
  };

  const invaildPassword = {
    code: 422,
    message: 'Password is invalid.',
  };

  const invaildPasswordEmail = {
    code: 500,
    message: 'Password and email are invalid.',
  };

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
  it('should return error for valid password'
    + 'that hasn\'t short length', () => {
    const result = validateRegisterForm('test@mail.com', 'P@1');

    expect(result).toEqual(invaildPassword);
  });

  it('should return error for valid password'
    + 'that hasn\'t too long length', () => {
    const result = validateRegisterForm('test@mail.com', 'P@abc1abfnklqwers');

    expect(result).toEqual(invaildPassword);
  });

  it('should have 1 digit 1 uppercase and 1 symbol', () => {
    const result = validateRegisterForm('test@mail.com', 'testtest');

    expect(result).toEqual(invaildPassword);
  });

  it('should email have only english letters', () => {
    const result = validateRegisterForm('тест@mail.com', 'P@ss1word');

    expect(result).toEqual(invaildEmail);
  });

  it('should email have @', () => {
    const result = validateRegisterForm('testmail.com', 'P@ss1word');

    expect(result).toEqual(invaildEmail);
  });

  it('shouldn\'t email have double dots', () => {
    const result = validateRegisterForm('te..st@mail.com', 'P@ss1word');

    expect(result).toEqual(invaildEmail);
  });

  it('shouldn\'t top domain\'s level start with .', () => {
    const result = validateRegisterForm('test@.mail.com', 'P@ss1word');

    expect(result).toEqual(invaildEmail);
  });

  it('should return 500 code if both are invalid', () => {
    const result = validateRegisterForm('test@.mail.com', 'word');

    expect(result).toEqual(invaildPasswordEmail);
  });
});
