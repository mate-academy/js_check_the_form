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

  it(`should return success message for the valid email 
  and password with Cyrillic letters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'Passroль@7');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid email 
  and password with 8 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssw0r1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid email 
  and password with 16 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssw0rdpassword');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
  and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password with 7 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw0r');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password with 17 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword1password');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the valid password
  and email with digits`, () => {
    const isValid = validateRegisterForm('test1@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid password
  and email with character`, () => {
    const isValid = validateRegisterForm('test_test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid password
  and email with capital`, () => {
    const isValid = validateRegisterForm('Test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password
  and email without @`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email, where first character is dot`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email, where last character of personal info is dot`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email, where top level domain starts with dot`, () => {
    const invalidEmail = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email, where two dot is come one after the other`, () => {
    const invalidEmail = validateRegisterForm('te..st@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email, where exist double dots`, () => {
    const invalidEmail = validateRegisterForm('tes:t@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid input`, () => {
    const invalidAll = validateRegisterForm('tes:tmail.com', 'password');

    expect(invalidAll.code).toBe(500);
    expect(invalidAll.message).toBe('Password and email are invalid.');
  });

  // write more tests here
});
