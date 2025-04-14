'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return an object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return success for valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for password missing number`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password missing special char`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'Password1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password missing uppercase`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'p@ssword1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password too short`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@s1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password too long`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword1!ExtraLong'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success for email missing @`, () => {
    const validEmail = validateRegisterForm(
      'testmail.com',
      'P@ssword1!'
    );

    expect(validEmail.code).toBe(422);
    expect(validEmail.message).toBe('Email is invalid.');
  });

  it(`should return success for email with double dots`, () => {
    const validEmail = validateRegisterForm(
      'test..mail@mail.com',
      'P@ssword1!'
    );

    expect(validEmail.code).toBe(422);
    expect(validEmail.message).toBe('Email is invalid.');
  });

  it(`should return success for email starting with dot`, () => {
    const validEmail = validateRegisterForm(
      '.test@mail.com',
      'P@ssword1!'
    );

    expect(validEmail.code).toBe(422);
    expect(validEmail.message).toBe('Email is invalid.');
  });

  it(`should return success for email ending with dot`, () => {
    const validEmail = validateRegisterForm(
      'test@mail.com.',
      'P@ssword1!'
    );

    expect(validEmail.code).toBe(200);
    expect(validEmail.message).toBe('Email and password are valid.');
  });

  it(`should return error for email missing domain dot`, () => {
    const invalidEmail = validateRegisterForm(
      'test@mailcom',
      'P@ssword1!'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for both invalid email and password`, () => {
    const invalidBoth = validateRegisterForm(
      'test@com',
      'ssword1'
    );

    expect(invalidBoth.code).toBe(500);
    expect(invalidBoth.message).toBe('Password and email are invalid.');
  });
});
