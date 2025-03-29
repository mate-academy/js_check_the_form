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

  it(`should return error for invalid email`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@sв1sword');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidEmailAndPassword = validateRegisterForm('.test@mail.com',
      'P@sвsword');

    expect(invalidEmailAndPassword.code).toBe(500);

    expect(invalidEmailAndPassword.message)
      .toBe('Password and email are invalid.');
  });

  it(`should return error with password less than 8 symbols`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sв1s');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error with password more than 16 symbols`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@sв1sd,asrtmgjdnsk');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for email
    started with "." and valid password `, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with : and valid password `, () => {
    const invalidEmail = validateRegisterForm('t:est@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with cyrillic letters `, () => {
    const invalidEmail = validateRegisterForm('tьest@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email without @`, () => {
    const invalidEmail = validateRegisterForm('tьestmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with
    top level domain that starts with . and valid password`, () => {
    const invalidEmail = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email without
    top level domain and valid password`, () => {
    const invalidEmail = validateRegisterForm('test@mail', 'True123!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with
   "#" character and valid password`, () => {
    const invalidEmail = validateRegisterForm('tes#t231@mail', 'True123!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
});
