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

  it(`should return error for invalid email 
    and invalid password`, () => {
    const invalidData = validateRegisterForm('test.@mail.com', 'P@ssw');

    expect(invalidData.code).toBe(500);
    expect(invalidData.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email 
    and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
    and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
    and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Pssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
    and password contains < 8 characters `, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswo1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
    and password contains > 16 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword123456789');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for email 
    without "@" and valid password `, () => {
    const invalidEmail = validateRegisterForm('testmailcom', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email
    started with "." and valid password `, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email 
    having ":" and valid password `, () => {
    const invalidEmail = validateRegisterForm(
      'test:test@mail.com',
      'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email 
    with "." after '@" and valid password `
  , () => {
    const invalidEmail = validateRegisterForm(
      'test@.mail.com',
      'P@ssword1!');
      // i dont know if we should make a test for all
      // Characters: ! # $ % & ' * + - / = ? ^ _ ` { | } ~

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email 
    having "+" before '@" and valid password `
  , () => {
    const invalidEmail = validateRegisterForm(
      'test+test@mail.com',
      'P@ssword1!');
      // i dont know if we should make a test for all Characters:
      //! # $ % & ' * + - / = ? ^ _ ` { | } ~

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return success message for the valid email 
    and valid password contains 8 characters`
  , () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@sswo1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid email  
    and valid password contains 9 characters`
  , () => {
    const isValid = validateRegisterForm(
      'test@mail.com',
      'P@sswo12!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for 
    the valid email and valid password 
    contains 16 characters`, () => {
    const isValid = validateRegisterForm(
      'test@mail.com',
      'P@ssword1!123457');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid email 
  and valid password contains 15 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!12345');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the 
    valid email contains digits and valid password `, () => {
    const isValid = validateRegisterForm(
      '123456789@mail.com',
      'pAs!@123457');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for 
    the valid email with uppercase letters 
    and valid password `, () => {
    const isValid = validateRegisterForm(
      'TEST@mail.com',
      'P@ssword1!');

    expect(isValid.code).toBe(200);

    expect(isValid.message)
      .toBe('Email and password are valid.');
  });

  // in README we can see => Requirements for the valid password:
  // accepts letters `Aa-Zz, Aa-Яя`;
  // but our test drop if Password contains cyrillique letters.
  // Maybe i didnt get it...
});
