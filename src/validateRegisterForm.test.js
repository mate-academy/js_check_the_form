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

  it(`should return error for valid email
    and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@1ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password with length less than 8`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@1ss');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password with length more than 16`, () => {
    // eslint-disable-next-line max-len
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@1sssdfgsdgfsdfgsdhsdfhsdgsdg');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for email without
    username and valid password`, () => {
    const invalidPassword = validateRegisterForm('@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email without
    domain and valid password`, () => {
    const invalidPassword = validateRegisterForm('test@', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email without
    '@' and valid password`, () => {
    const invalidPassword
      = validateRegisterForm('testgmail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email with
    '.' on the beginning and valid password`, () => {
    const invalidPassword
      = validateRegisterForm('.test@gmail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for email with
    not Latin charecters and valid password`, () => {
    const invalidPassword
      = validateRegisterForm('аоаппо@gmail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return success message for the email
    with special characters and valid password`, () => {
    const isValid = validateRegisterForm('tes-t@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for the invalid email and password`, () => {
    const isValid = validateRegisterForm('testmail.com', 'Pss1!');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });

  it(`should return error message for the empty email and password`, () => {
    const isValid = validateRegisterForm('', '');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });
});
