'use strict';

const validateRegisterForm = require('./validateRegisterForm');

describe('validateRegisterForm', () => {
  it('should return status 200 for valid email and password', () => {
    const result = validateRegisterForm('valid@example.com', 'Valid@12345');

    expect(result).toEqual({
      code: 200,
      message: 'Email and password are valid.',
    });
  });

  it('should return status 422 if email is invalid (missing @)', () => {
    const result = validateRegisterForm('invalidexample.com', 'Valid@12345');

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it('should return status 422 if email starts with a dot', () => {
    const result = validateRegisterForm('.invalid@example.com', 'Valid@12345');

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it('should return status 422 if email contains double dots', () => {
    const result = validateRegisterForm('invalid..email@example.com', 'Valid@12345');

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it('should return status 422 if password is too short', () => {
    const result = validateRegisterForm('valid@example.com', 'Short1!');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it('should return status 422 if password is too long', () => {
    const result = validateRegisterForm('valid@example.com', 'ThisPasswordIsWayTooLong@123');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it('should return status 422 if password does not contain a digit', () => {
    const result = validateRegisterForm('valid@example.com', 'Password@!');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it('should return status 422 if password does not contain a special character', () => {
    const result = validateRegisterForm('valid@example.com', 'Password123');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it('should return status 422 if password does not contain an uppercase letter', () => {
    const result = validateRegisterForm('valid@example.com', 'password@123');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it('should return status 422 if password does not contain a lowercase letter', () => {
    const result = validateRegisterForm('valid@example.com', 'PASSWORD@123');

    expect(result).toEqual({
      code: 422,
      message: 'Password is invalid.',
    });
  });

  it('should return status 500 if both email and password are invalid', () => {
    const result = validateRegisterForm('invalidexample.com', 'short');

    expect(result).toEqual({
      code: 500,
      message: 'Password and email are invalid.',
    });
  });
});
