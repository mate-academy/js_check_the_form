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

  it(`should return error for valid email and password `
  + `without capital latter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p1@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password `
  + `without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password`
  + ` langth less 8 character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1*word');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password`
  + `lenght more than 16 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P1@sswordqwerttyu');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email and password`
  + `lenght 16 characters`, () => {
    const validPassword = validateRegisterForm('test@mail.com',
      'P1@sswordqwettyu');

    expect(validPassword.code).toBe(200);
    expect(validPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid password`
  + `and  email with capital letter`, () => {
    const validEmail = validateRegisterForm('Test@mail.com',
      'P1@ssword');

    expect(validEmail.code).toBe(200);
    expect(validEmail.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password `
  + `and  email with Cyrillic letters`, () => {
    const invalidEmail = validateRegisterForm('Testф@mail.com',
      'P1@ssword');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
  + `and  email  starting with a dot`, () => {
    const invalidEmail = validateRegisterForm('.Testф@mail.com',
      'P1@ssword');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
  + `and mail whose name ends with a dot`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com',
      'P1@ssword');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
  + `and mail whose name contains two consecutive dots`, () => {
    const invalidEmail = validateRegisterForm('tes..t@mail.com',
      'P1@ssword');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
  + `and mail whose domain begins with a dot`, () => {
    const invalidEmail = validateRegisterForm('test@.mail.com',
      'P1@ssword');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password `
  + `and mail containing a space`, () => {
    const invalidEmail = validateRegisterForm('te st@mail.com',
      'P1@ssword');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
});
