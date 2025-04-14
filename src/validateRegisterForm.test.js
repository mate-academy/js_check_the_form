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

  it(`should return success message for the valid input`, () => {
    const notValid = validateRegisterForm('te:st@mail.com', 'P@sswor!');

    expect(notValid.code).toBe(500);
    expect(notValid.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password`
    + ` without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for a valid email and`
    + ` password without an uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for valid email and password`
    + ` length of password less than 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@srd1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for valid email and password`
    + ` length of password greater than 16 characters`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'Pasword@pasword123'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for a valid password and`
    + ` an email that contains non-English characters`, () => {
    const invalidEmail = validateRegisterForm(
      'тest@mail.com',
      'P@sword1'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid password and`
    + ` an email that contains a dot at the beginning`, () => {
    const invalidEmail = validateRegisterForm(
      '.test@mail.com',
      'P@sword1'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid password and`
    + ` an email that contains a dot at the end`, () => {
    const invalidEmail = validateRegisterForm(
      'test.@mail.com',
      'P@sword1'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid password and`
    + ` an email that contains multiple periods in a row`, () => {
    const invalidEmail = validateRegisterForm(
      'te..st@mail.com',
      'P@sword1'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid password and`
    + ` an email that does not contain an '@'`, () => {
    const invalidEmail = validateRegisterForm(
      'testmail.com',
      'P@sword1'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid password and`
    + ` an email if the domain starts with a dot`, () => {
    const invalidEmail = validateRegisterForm(
      'test@.mail.com',
      'P@sword1'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid password and`
    + ` an email containing ':'`, () => {
    const invalidEmail = validateRegisterForm(
      'te:st@mail.com',
      'P@sword1'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error for a valid password and`
    + ` an email that does not contain a domain`, () => {
    const invalidEmail = validateRegisterForm(
      'test@com',
      'P@sword1'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
});
