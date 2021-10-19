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

  it(`should return error for valid email and password without capital`, () => {
    const invalidPassword = validateRegisterForm('milkat@mail.com', 'p@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and 
    password without special character`, () => {
    const invalidPassword = validateRegisterForm('milkat@mail.com', 'password');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and 
    password with 7 characters`, () => {
    const invalidPassword = validateRegisterForm('limo@mail.com', 'Pa$$w12');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and 
    password with 17 characters`, () => {
    const invalidPassword = validateRegisterForm('limo@mail.com',
      'myuserPa$$word123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password 
    and email without '@' symbol`, () => {
    const invalidEmail = validateRegisterForm('test_mail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password 
    and email starts with dot`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password 
    and email's username ends with dot`, () => {
    const invalidEmail = validateRegisterForm('little.@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password 
    and email contain Non-Latin`, () => {
    const invalidEmail = validateRegisterForm('ZaЯц@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password 
    and email with double dots`, () => {
    const invalidEmail = validateRegisterForm('My..mail@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid password 
    and invalid email`, () => {
    const invalidData = validateRegisterForm('test@mail-com', 'p@ssword1');

    expect(invalidData.code).toBe(500);
    expect(invalidData.message).toBe('Password and email are invalid.');
  });
});
