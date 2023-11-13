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

  it(`should return error for email with incorrect format`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email and password without
  uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without
  special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for email and password that
   do not meet the requirements`, () => {
    const invalidData = validateRegisterForm('testmail.com', 'password1');

    expect(invalidData.code).toBe(500);
    expect(invalidData.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid password and invalid email`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email and invalid password length`, () => {
    const invalidEmail = validateRegisterForm('test@mail.com', 'W@rd1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and email
  whith double dots`, () => {
    const invalidEmail = validateRegisterForm('test:12@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and an email with
   a dot symbol, which come one after the other`, () => {
    const invalidEmail = validateRegisterForm('te..st@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email username that
   starts with a dot symbol`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid password and an email address
  that contains characters: '! # $ % & ' * + - / = ? ^ _ { | } ~'`, () => {
    const invalidEmail = validateRegisterForm('t!e#st@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email without
  top level domain with dot`, () => {
    const invalidEmail = validateRegisterForm('test@mailcom', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid email address and password length
  greater than 16 characters`, () => {
    const invalidEmail
    = validateRegisterForm('test@mail.com', 'P@ssssssswwwwwwoooooord1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and email username that
  ends with a dot symbol`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
});
