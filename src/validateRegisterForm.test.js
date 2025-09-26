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

  it(`password should not be shorter than 8 signs`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ss1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`password should not be longer than 16 signs`, () => {
    const invalidPassword
     = validateRegisterForm('test@mail.com', 'P@ssword12345678900000');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`password should contain at least
     1 digit, 1 special character, 1 uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'password');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`email should contain only english letter`, () => {
    const invalidPassword = validateRegisterForm('tęst@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`email should not contain special characters`, () => {
    const invalidPassword = validateRegisterForm('test!@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`email should not have dots on the beginning`, () => {
    const invalidPassword = validateRegisterForm('.test@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`email should should have '@'`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`email should not start from dot in domain part`, () => {
    const invalidPassword = validateRegisterForm('test@.mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`email should not contain double dots`, () => {
    const invalidPassword
     = validateRegisterForm('test@..mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });
});
