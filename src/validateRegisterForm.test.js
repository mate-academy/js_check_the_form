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

  it(`returns success message for a valid email
  and a password with 8 valid characters`, () => {
    const isValid = validateRegisterForm('test4Email@mail.com',
      'P@sword1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`returns success message for a valid email
  and a password with 13 valid characters`, () => {
    const isValid = validateRegisterForm('test4Email@mail.com',
      'P@ssword4test');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`returns success message for a valid email
  and a password with Cyrillic characters`, () => {
    const isValid = validateRegisterForm('test4Email@mail.com',
      'Vareники)1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`returns success message for the valid email
  and a password with 16 valid characters`, () => {
    const isValid = validateRegisterForm('test4Email@mail.com',
      'P@ssword1!4te$$t');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`returns error for a valid email
  and a password without special symbol`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`returns error for a valid email and a password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`returns error for a valid email
  and a password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'p@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`returns error for a valid email
  and a password with 7 valid characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@swor9');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`returns error for a valid email
  and a password with 17 valid characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword4testing!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`returns error for a valid password
  and an email whithout '@' symbol`, () => {
    const invalidEmail = validateRegisterForm('testmail.com',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for a valid password
  and an email whithout '.' symbol`, () => {
    const invalidEmail = validateRegisterForm('test@mailcom',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for a valid password
  and an email whithout name`, () => {
    const invalidEmail = validateRegisterForm('@mailcom',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for a valid password
  and an email that starts with '.'`, () => {
    const invalidEmail = validateRegisterForm('.test@mailcom',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for a valid password
  and an email that contains Cyrillic letters`, () => {
    const invalidEmail = validateRegisterForm('тест@mail.com',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for a valid password
  and an email that ends with '.'`, () => {
    const invalidEmail = validateRegisterForm('test@mailcom',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for a valid password
  and an email which name contains special symbols`, () => {
    const invalidEmail = validateRegisterForm('te$tema!l@mail.com',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for a valid password
  and an email which name contains whitespaces`, () => {
    const invalidEmail = validateRegisterForm('test Email@mail.com',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for a valid password
  and an email which name contains range of special symbols`, () => {
    const invalidEmail = validateRegisterForm('test!#$%&*+-/=?^{|}it@mail.com',
      'Pa$$word17');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`returns error for invalid password and invalid email`, () => {
    const invalidEmail = validateRegisterForm('te$$t@mail.com',
      'MyPassword');

    expect(invalidEmail.code).toBe(500);
    expect(invalidEmail.message).toBe('Password and email are invalid.');
  });
});
