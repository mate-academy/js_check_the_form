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

  it(`should return error for invalid password and invalid email`, () => {
    const invalidPassword
      = validateRegisterForm('test@maяil..com', '1ppDdddddddd');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email `
    + `and password length is less than 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', '1P@ssw');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email `
    + `and password length is more than 16 characters`, () => {
    const invalidPassword
      = validateRegisterForm('test@mail.com', '1P@sswordddddddddddddddDDD');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email `
    + `and password without specail symbol`, () => {
    const invalidPassword
      = validateRegisterForm('test@mail.com', '1PDDDDDDD');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email `
    + `and password without 1 uppercase letter`, () => {
    const invalidPassword
      = validateRegisterForm('test@mail.com', '1pp@dddddddd');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password `
    + `and email without @`, () => {
    const invalidPassword
      = validateRegisterForm('testmail.com', '1ppD@dddddddd');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
    + `and email with not English letters(Aa-Zz)`, () => {
    const invalidPassword
      = validateRegisterForm('test@maяil.com', '1ppD@dddddddd');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
    + `and email if email includes . as first character`, () => {
    const invalidPassword
      = validateRegisterForm('.test@mail.com', '1ppD@dddddddd');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
    + `and email if email includes . as last character before @`, () => {
    const invalidPassword
      = validateRegisterForm('test.@mail.com', '1ppD@dddddddd');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
    + `and email if email has . come one after the other`, () => {
    const invalidPassword
      = validateRegisterForm('te..st@mail.com', '1ppD@dddddddd');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
    + `and email if top level domain of email starts with dot .`, () => {
    const invalidPassword
      = validateRegisterForm('test@.mail.com', '1ppD@dddddddd');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the `
    + `valid input if email includes digits`, () => {
    const isValid = validateRegisterForm('te123st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the `
    + `valid input if email includes special symbols`, () => {
    const isValid = validateRegisterForm('te12-3st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });
});
