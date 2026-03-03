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

  it(`should return success for valid password with Cyrillic letters`, () => {
    const result = validateRegisterForm('test@mail.com', 'ValidПароль1!');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
});

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and wrong email`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid password and email`, () => {
    const invalidData = validateRegisterForm('testmail.com', 'P@ssword');

    expect(invalidData.code).toBe(500);
    expect(invalidData.message).toBe('Password and email are invalid.');
  });

  it(`should return error for password shorter than 8 characters`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@s1a');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password longer than 16 characters`, () => {
    const result = validateRegisterForm(
      'test@mail.com',
      'P@ssword1234567890'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without special character`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for email starting with dot`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error if email ends with a dot`, () => {
    const result = validateRegisterForm('testexample.com.', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email with consecutive dots`, () => {
    const result = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });
});
