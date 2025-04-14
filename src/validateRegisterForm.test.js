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

  it(`should return error if password length < 8`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@s1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error if password length > 16`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword12345678!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error if missed 1 digit, 1 special `
    + `character, 1 uppercase letter in password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'password');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error if the email includes non-English letters`, () => {
    const invalidPassword = validateRegisterForm('tцst@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error if the email missed '@'`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error if the email starts with '.'`, () => {
    const invalidPassword = validateRegisterForm('.tst@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error if the email ends with '.'`, () => {
    const invalidPassword = validateRegisterForm('tst.@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error if the email includes 2 '.' in a row`, () => {
    const invalidPassword = validateRegisterForm(
      'ts..t@mail.com.',
      'P@ssword1!'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error if the top `
    + `level domain email starts with '.'`, () => {
    const invalidPassword = validateRegisterForm('tst@.mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error if the email includes with ':'`, () => {
    const invalidPassword = validateRegisterForm('t:st@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error if the email and password invalid`, () => {
    const invalidPassword = validateRegisterForm('t:st@mail.com', 'p@ssword1!');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
