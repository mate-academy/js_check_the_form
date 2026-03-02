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

  it('should return invalid message for incorrect email', () => {
    const result = validateRegisterForm('test@com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422, message: 'Email is invalid.',
    });
  });

  it(`should return invalid message for both incorrect email
    and password`, () => {
    const result = validateRegisterForm('testcom', 'sswo');

    expect(result).toEqual({
      code: 500, message: 'Password and email are invalid.',
    });
  });

  it(`should return invalid message for password without
    special character`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password123');

    expect(result).toEqual({
      code: 422, message: 'Password is invalid.',
    });
  });

  it('should return invalid message for password without digit', () => {
    const result = validateRegisterForm('test@mail.com', 'Password!');

    expect(result).toEqual({
      code: 422, message: 'Password is invalid.',
    });
  });

  it(`should return invalid message for password without uppercase
    letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'password1!');

    expect(result).toEqual({
      code: 422, message: 'Password is invalid.',
    });
  });

  it(`should return invalid message for password shorter than
    8 characters`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ss1');

    expect(result).toEqual({
      code: 422, message: 'Password is invalid.',
    });
  });

  it(`should return invalid message for password longer than 16
    characters`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword123456789!');

    expect(result).toEqual({
      code: 422, message: 'Password is invalid.',
    });
  });

  it('should return invalid message for email starting with a dot', () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422, message: 'Email is invalid.',
    });
  });

  it('should return invalid message for email with consecutive dots', () => {
    const result = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422, message: 'Email is invalid.',
    });
  });

  it('should return invalid message for email without @ symbol', () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422, message: 'Email is invalid.',
    });
  });

  it('should return invalid message for email with invalid characters', () => {
    const result = validateRegisterForm('test@mail#.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422, message: 'Email is invalid.',
    });
  });

  it('should return invalid message for empty password', () => {
    const result = validateRegisterForm('test@mail.com', '');

    expect(result).toEqual({
      code: 422, message: 'Password is invalid.',
    });
  });

  it(`should return invalid message for password missing one or
    more requirements`, () => {
    const result = validateRegisterForm('test@mail.com', 'password');

    expect(result).toEqual({
      code: 422, message: 'Password is invalid.',
    });
  });
});
