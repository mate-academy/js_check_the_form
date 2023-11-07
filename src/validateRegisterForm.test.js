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
    const isValid = validateRegisterForm('test_1@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
   password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
   password without Latin letters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', '@#$%12345');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
   password without Latin letters in upper case`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'pass%1234');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`Should return an error if valid email and
   password are shorter than 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Pass%12');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`Should return an error if valid email and
   password are longer than 16 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'Password%12345678');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`Should return an error with a valid password
   and email without the @ symbol`, () => {
    const invalidPassword = validateRegisterForm('testmail.com',
      'Password%123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`Should return an error with a valid password
   and email starting with "."`, () => {
    const invalidPassword = validateRegisterForm('.test@mail.com',
      'Password%123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`Should return an error with a valid password
   and email where Cyrillic letters are used`, () => {
    const invalidPassword = validateRegisterForm('тest@.mail.com',
      'Password%123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  // write more tests here
});
