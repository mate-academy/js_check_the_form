'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm)
      .toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code)
      .toBe(200);

    expect(isValid.message)
      .toBe('Email and password are valid.');
  });

  it(`should return error for valid email
   and password without number`, () => {
    const invalidPassword
     = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error for valid email
   and password without special char`, () => {
    const invalidPassword
     = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error for valid email
   and password without uppercase letter`, () => {
    const invalidPassword
     = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error for valid email
   and password length < 8`, () => {
    const invalidPassword
     = validateRegisterForm('test@mail.com', 'P@srd1!');

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error for valid email
   and password length > 16`, () => {
    const invalidPassword
     = validateRegisterForm('test@mail.com', 'P@sworrrrrrrrrrd1!');

    expect(invalidPassword.code)
      .toBe(422);

    expect(invalidPassword.message)
      .toBe('Password is invalid.');
  });

  it(`should return error for invalid email
   and valid password`, () => {
    const invalidEmail
    = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code)
      .toBe(422);

    expect(invalidEmail.message)
      .toBe('Email is invalid.');
  });

  it(`should return error for invalid email when
    top Level domain start with dot '.'
   and valid password`, () => {
    const invalidEmail
    = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(invalidEmail.code)
      .toBe(422);

    expect(invalidEmail.message)
      .toBe('Email is invalid.');
  });

  it(`should return error for invalid email -
    an email should not be start with '.'
    and valid password`, () => {
    const invalidEmail
    = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code)
      .toBe(422);

    expect(invalidEmail.message)
      .toBe('Email is invalid.');
  });

  it(`should return error for invalid email -
    double dots are not allowed
    and valid password`, () => {
    const invalidEmail
    = validateRegisterForm('te:st@mail.com', 'P@ssword1!');

    expect(invalidEmail.code)
      .toBe(422);

    expect(invalidEmail.message)
      .toBe('Email is invalid.');
  });

  it(`should return error for invalid email -
    double dots are not allowed
    and valid password`, () => {
    const invalidEmail
    = validateRegisterForm('te:st@mail.com', 'ssword1!');

    expect(invalidEmail.code)
      .toBe(500);

    expect(invalidEmail.message)
      .toBe('Password and email are invalid.');
  });
});
