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

  it(`should return error for valid email and password 
    without one capital letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p1@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password 
    without one special symbol`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password 
    with 7 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@1sswo');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password 
    with 17 characters`, () => {
    const invalidPassword
    = validateRegisterForm('test@mail.com', 'P@1sswodP@1sswod1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email and 
    password with 8 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@sswo1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid email and 
    password with 16 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@sswo1!P@sswo1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for valid password 
  and email with non-Latin letters`, () => {
    const isValid = validateRegisterForm('eтst@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password 
  and email with not allowed special symbols`, () => {
    const isValid = validateRegisterForm('t"est@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password 
  and email with dot at the beginning of username`, () => {
    const isValid = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password 
  and email with dot at the end of username`, () => {
    const isValid = validateRegisterForm('test.@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password 
  and email with 2 dots in a row in username`, () => {
    const isValid = validateRegisterForm('t..est@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password 
  and email without "@" symbol`, () => {
    const isValid = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password 
  and dot at the beginning of top level domain`, () => {
    const isValid = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password 
  and dot at the beginning of top level domain`, () => {
    const isValid = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for both email and password 
    invalid input`, () => {
    const isValid = validateRegisterForm('testmail.com', 'P@ssword!');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });
});
