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

  // write more tests here
  it(`should return error for valid password and email without '@'`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it('should return error if the email and password are empty', () => {
    const isInvalid = validateRegisterForm('.', ',');

    expect(isInvalid.code).toBe(500);
    expect(isInvalid.message).toBe('Password and email are invalid.');
  });

  it('should return error if the email and password are invalid', () => {
    const isInvalid = validateRegisterForm('test@com', 'ssword1');

    expect(isInvalid.code).toBe(500);
    expect(isInvalid.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email'
  + 'and password with 7 charachters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswo1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email'
  + 'and password with 17 charachters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword123456789');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email'
  + 'and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email'
  + 'and password without Capital letter `, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the valid email'
  + 'and password with cyrillic letters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword_йо1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password'
  + 'and email without Latin letter`, () => {
    const invalidPassword = validateRegisterForm('testП@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email'
  + 'which  'personal_info' part start with dot`, () => {
    const invalidPassword = validateRegisterForm('.test@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email'
  + 'which 'personal_info' part end with dot`, () => {
    const invalidPassword = validateRegisterForm('test.@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password'
  + 'and email with double dots`, () => {
    const invalidPassword = validateRegisterForm('tes..t@mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email 
   domain start with dot`, () => {
    const invalidPassword = validateRegisterForm('test@.mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password`
  + `and mail containing a space`, () => {
    const invalidEmail = validateRegisterForm('te st@mail.com',
      'P1@ssword');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email with digits`, () => {
    const isValid = validateRegisterForm('te77st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message valid password and email'
+ 'which includes these characters:'! $ % & ' * + / = ? ^ { | } ~'`, () => {
    const isValid = validateRegisterForm('te7-7st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });
});
