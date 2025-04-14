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

  it(`should return error for the
  password and email invalid`, () => {
    const isValid = validateRegisterForm('email', 'pas');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email
  and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

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
  and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password length less than 8 char`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Pas@1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
  and password length more than 16 char`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'PasswordPassword@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return succes message for valid email
  and password with Cyrillic char`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P#s1!їжачок'
    );

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password
  and email with Cyrillic char`, () => {
    const invalidPassword = validateRegisterForm(
      'мій@mail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return succes message for valid password
  and email with digit`, () => {
    const invalidPassword = validateRegisterForm(
      'test1@mail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password
  and email with special char`, () => {
    const invalidPassword = validateRegisterForm(
      'test#@mail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email with non-printable char`, () => {
    const invalidPassword = validateRegisterForm(
      'te st@mail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email without @ char`, () => {
    const invalidPassword = validateRegisterForm(
      'testmail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email without name`, () => {
    const invalidPassword = validateRegisterForm(
      '@mail.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email without domain`, () => {
    const invalidPassword = validateRegisterForm(
      'test@.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email without TLD`, () => {
    const invalidPassword = validateRegisterForm(
      'test@email',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email without '.' symbol in domain`, () => {
    const invalidPassword = validateRegisterForm(
      'test@namecom',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email name start with '.' symbol`, () => {
    const invalidPassword = validateRegisterForm(
      '.test@name.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email domain start with '.' symbol`, () => {
    const invalidPassword = validateRegisterForm(
      'test@.name.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email names ends with '.' symbol`, () => {
    const invalidPassword = validateRegisterForm(
      'test.@name.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email name with double '.' symbol`, () => {
    const invalidPassword = validateRegisterForm(
      'te..st@name.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password
  and email name with ':' symbol`, () => {
    const invalidPassword = validateRegisterForm(
      'te:st@name.com',
      'Passwor@1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });
});
