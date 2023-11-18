/* eslint max-len: ["error", { "code": 120 }] */

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

  it(`should return error for valid email and password without a number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and invalid email`, () => {
    const invalidEmail = validateRegisterForm('test@.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for both invalid email and password`, () => {
    const invalidEmailAndPassword = validateRegisterForm('test@.com', 'password');

    expect(invalidEmailAndPassword.code).toBe(500);
    expect(invalidEmailAndPassword.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email and valid password, but with too short password`, () => {
    const tooShortPassword = validateRegisterForm('test@mail.com', 'A@b1');

    expect(tooShortPassword.code).toBe(422);
    expect(tooShortPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and valid password, but with too long password`, () => {
    const tooLongPassword = validateRegisterForm('test@mail.com', 'A@b1!CdeFgH1I2J3K4L5');

    expect(tooLongPassword.code).toBe(422);
    expect(tooLongPassword.message).toBe('Password is invalid.');
  });

  it(`should return success for valid email and password, exactly 8 characters long`, () => {
    const validLength = validateRegisterForm('test@mail.com', 'A@b1Cde');

    expect(validLength.code).toBe(200);
    expect(validLength.message).toBe('Email and password are valid.');
  });

  it(`should return success for valid email and password, exactly 16 characters long`, () => {
    const validLength = validateRegisterForm('test@mail.com', 'A@b1CdeFgH1I2J3K4L');

    expect(validLength.code).toBe(200);
    expect(validLength.message).toBe('Email and password are valid.');
  });

  it(`should return error for invalid email with repeated dots`, () => {
    const repeatedDots = validateRegisterForm('test..mail.com', 'P@ssword1!');

    expect(repeatedDots.code).toBe(422);
    expect(repeatedDots.message).toBe('Email is invalid.');
  });
});
