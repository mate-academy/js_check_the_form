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

  it(`should return error for valid email and password of length 7`,
    () => {
      const invalidPassword = validateRegisterForm('test@mail.com',
        'P@sswor');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

  it(`should return error for valid email and password less 
  than 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ss1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email
   and password of length 16`, () => {
    const isValid = validateRegisterForm('test@mail.com',
      'P@ssword1234567');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password less 
  than 17 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ss1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password of
   length 10 without capital letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password of
   length 10 without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password of
   length 10 without digit`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword!');

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

  it(`should return error for email not ending with '.'`, () => {
    const validEmail = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(validEmail.code).not.toBe(422);
    expect(validEmail.message).not.toBe('Email is invalid.');
  });

  it(`should return error for invalid email with consecutive dots`,
    () => {
      const invalidEmail = validateRegisterForm('test..mail@mail.com',
        'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

  it(`should return error for Email with top-level domain 
    starting with a dot`, () => {
    const invalidEmail = validateRegisterForm('example@mail.com.',
      'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and password`, () => {
    const invalidEmailAndPassword = validateRegisterForm('invalidemail',
      'invalidpassword');

    expect(invalidEmailAndPassword.code).toBe(500);

    expect(invalidEmailAndPassword.message)
      .toBe('Password and email are invalid.');
  });
});
