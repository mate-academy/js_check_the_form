/* eslint-disable max-len */
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

  it(`should return an object with code 200 and message 'Email and password are valid.' for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return an object with code 422 and message 'Password is invalid.' for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an object with code 422 and message 'Email is invalid.' for valid password and invalid email`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an object with code 500 and message 'Password and email are invalid.' for invalid email and invalid password`, () => {
    const invalidEmailPassword = validateRegisterForm('test@com', 'пароль');

    expect(invalidEmailPassword.code).toBe(500);

    expect(invalidEmailPassword.message)
      .toBe('Password and email are invalid.');
  });

  it(`should handle valid email and password with minimum length`, () => {
    const minLengthValid = validateRegisterForm('test10@mail.com', 'Blaвєї1?');

    expect(minLengthValid.code).toBe(200);
    expect(minLengthValid.message).toBe('Email and password are valid.');
  });

  it(`should handle valid email and password with maximum length`, () => {
    const maxLengthValid = validateRegisterForm(
      'test10@mail.com',
      'бла$1234тecтBLA9'
    );

    expect(maxLengthValid.code).toBe(200);
    expect(maxLengthValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for invalid email and password with minimum length`, () => {
    const minLengthInvalid = validateRegisterForm('test@com', 'p@sS9');

    expect(minLengthInvalid.code).toBe(500);
    expect(minLengthInvalid.message).toBe('Password and email are invalid.');
  });

  it(`should return error for invalid email and password with maximum length`, () => {
    const maxLengthInvalid = validateRegisterForm(
      'test@com',
      'P@ssw0rd123456789'
    );

    expect(maxLengthInvalid.code).toBe(500);
    expect(maxLengthInvalid.message).toBe('Password and email are invalid.');
  });
});
