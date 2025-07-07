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

  it(`should return error for invalid email and valid password`, () => {
    const invalidPassword = validateRegisterForm('ыest@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // EMAIL CHECK
  it(`Email should consist of English letters (Aa-Zz)`, () => {
    const invalidPassword = validateRegisterForm('ыest@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`Available special characters: ! # $ % & ' * + - / = ? ^ _ `
    + '\\` { | } ~', () => {
    const invalidPassword = validateRegisterForm(
      'te(st@mail.com,', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`Character . ( period, dot or fullstop) provided that it is not the first`
    + ' or last character and it will not come one after the other.', () => {
    const invalidPassword = validateRegisterForm(
      'tes;;t@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`@ is required in email`, () => {
    const invalidPassword = validateRegisterForm(
      'testmail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`Top level domain of email can not start with dot .`, () => {
    const invalidPassword = validateRegisterForm(
      '.test@mail..com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`an email should not be start with .`, () => {
    const invalidPassword = validateRegisterForm(
      '.test@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`Double dots are not allowed in email`, () => {
    const invalidPassword = validateRegisterForm(
      'tes..t@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  // PASSWORD CHECK
  it(`Password should consist of English letters Aa-Zz `
    + 'and ukrainian Aa-Яя', () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Pы@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`Password should consist of at least 8 characters inclusive`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswor');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`Password should consist of not more that 16 characters inclusive`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com', 'P@ssworlkjsklsdfklgjdfslkjhkldfsjhdsfhsdfh');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`Password should contain at least 1 digit, 1 special character, `
    + '1 uppercase letter.', () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com', 'password123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
});
