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

  it(`should return error for valid email and password less 
  than 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ss1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password greater
   than 16 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword123456789!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for invalid email without '@' symbol`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email starting with '.'`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email ending with '.'`, () => {
    const invalidEmail = validateRegisterForm('test@mail.com.', 'P@ssword1!');

    expect(invalidEmail.code).toBe(200);
    expect(invalidEmail.message).toBe('Email and password are valid.');
  });

  it(`should return error for invalid email with consecutive dots`, () => {
    const invalidEmail = validateRegisterForm('test..mail@mail.com',
      'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email with
   top-level domain starting with a dot`, () => {
    const invalidEmail = validateRegisterForm('test@mail.com.', 'P@ssword1!');

    expect(invalidEmail.code).toBe(200);
    expect(invalidEmail.message).toBe('Email and password are valid.');
  });
});
