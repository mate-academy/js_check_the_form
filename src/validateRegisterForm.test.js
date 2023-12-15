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
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(
    `should return error for valid email
    and password without uppercase letter`,
    () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'p1@ssword!'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

  it(
    `should return error for valid email
      and password without special character`,
    () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'P1ssword'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

  it(
    `should return error for valid email
        and short password`,
    () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'P1@ss!'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

  it(
    `should return error for valid email
          and long password`,
    () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'P1@ssfhgkghmghuktfgdcnhg!'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

  it(
    `should return error for valid password
     and email starts with dot`,
    () => {
      const invalidPassword = validateRegisterForm(
        '.test@mail.com', 'P@ssword1!'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

  it(
    `should return error for valid password
     and email with double dots`,
    () => {
      const invalidPassword = validateRegisterForm(
        'te..st@mail.com', 'P@ssword1!'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

  it(
    `should return error for valid password
     and email without @`,
    () => {
      const invalidPassword = validateRegisterForm(
        'testmail.com', 'P@ssword1!'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

  it(
    `should return error for valid password
     and top level domain can not start with dot`,
    () => {
      const invalidPassword = validateRegisterForm(
        'test@.mail.com', 'P@ssword1!'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

  it(
    `should return error for invalid both email and password`,
    () => {
      const invalidPassword = validateRegisterForm(
        '.test@.mail.com', 'p@ssword1!'
      );

      expect(invalidPassword.code).toBe(500);
      expect(invalidPassword.message).toBe('Password and email are invalid.');
    });
});
