'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe(
      'object'
    );
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return an error for valid email and password
  without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for valid email and password without
  special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for valid email and password without
  uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it.skip(`should return an error for valid email and password
  with invalid letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswórd1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for valid email and too short password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for valid email and too long password`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@sswordpassword1'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for valid password and email
  with invalid letters`, () => {
    const invalidPassword = validateRegisterForm('tпst@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return an error for valid password and email
  with invalid characters`, () => {
    const invalidPassword = validateRegisterForm('te,t@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return an error for valid password and email
  with character . at the start`, () => {
    const invalidPassword = validateRegisterForm('.est@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return an error for valid password and email
  without character .`, () => {
    const invalidPassword = validateRegisterForm('test@mailcom', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it.skip(`should return an error for valid password and email
  with character . at the end`, () => {
    let invalidPassword = validateRegisterForm('tes@mail.com.', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');

    invalidPassword = validateRegisterForm('tes.@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it.skip(`should return an error for valid password and email
  with double dots`, () => {
    let invalidPassword = validateRegisterForm('te..s@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');

    invalidPassword = validateRegisterForm('test@mail..com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');

    invalidPassword = validateRegisterForm('test@ma..il.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return an error for valid password and @ is missed
  in the email`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return an error for valid password and email
  with top level domain started with .`, () => {
    const invalidPassword = validateRegisterForm('tes@.mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return an error for valid password and email
  with top level domain started with .`, () => {
    const invalidPassword = validateRegisterForm('tes@.mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return a proper error for both invalid email and password`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
