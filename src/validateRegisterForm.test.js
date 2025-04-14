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

  it(`should return an error for an invalid email`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@assword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return an error  for invalid email and password`, () => {
    const invalidBoth = validateRegisterForm('test@com', 'ssword1');

    expect(invalidBoth.code).toBe(500);

    expect(invalidBoth.message)
      .toBe('Password and email are invalid.');
  });

  it(`should return an error for an empty email and valid password`, () => {
    const emptyEmail = validateRegisterForm('', 'P@assword1!');

    expect(emptyEmail.code).toBe(422);
    expect(emptyEmail.message).toBe('Email is invalid.');
  });

  it(`should return an erro for a valid email and empty password`, () => {
    const emptyPassword = validateRegisterForm('test@gmail.com', '');

    expect(emptyPassword.code).toBe(422);
    expect(emptyPassword.message).toBe('Password is invalid.');
  });

  it(`should return an error for an empty email and empty password`, () => {
    const emptyBoth = validateRegisterForm('', '');

    expect(emptyBoth.code).toBe(500);
    expect(emptyBoth.message).toBe('Password and email are invalid.');
  });

  it(`should return and error for Cyrillic characters in email`, () => {
    const cyrillicEmail = validateRegisterForm('tesд@gmail.com', 'P@ssword1!');

    expect(cyrillicEmail.code).toBe(422);
    expect(cyrillicEmail.message).toBe('Email is invalid.');
  });

  it(`should return succes for Cyrillic characters in password`, () => {
    const cyrillicEmail = validateRegisterForm('test@gmail.com', 'P@ssworд1!');

    expect(cyrillicEmail.code).toBe(200);
    expect(cyrillicEmail.message).toBe('Email and password are valid.');
  });
});
