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

  // Email and password are valid

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test.123@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test.mike.123@mail.com',
      'qwErty_921');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  // Email is invalid

  it(`should return error 'Email is invalid.'
  for email starts with dot and valid password`, () => {
    const invalidEnail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(invalidEnail.code).toBe(422);
    expect(invalidEnail.message).toBe('Email is invalid.');
  });

  it(`should return error 'Email is invalid.'
  for email ends with dot and valid password`, () => {
    const invalidEnail = validateRegisterForm('test.@mail.com', 'P@ssword1!');

    expect(invalidEnail.code).toBe(422);
    expect(invalidEnail.message).toBe('Email is invalid.');
  });

  it(`should return error 'Email is invalid.'
  for the email with domain starts with dot and valid password`, () => {
    const invalidEnail = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(invalidEnail.code).toBe(422);
    expect(invalidEnail.message).toBe('Email is invalid.');
  });

  it(`should return error 'Email is invalid.'
  for the email without @ symbol and valid password`, () => {
    const invalidEnail = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidEnail.code).toBe(422);
    expect(invalidEnail.message).toBe('Email is invalid.');
  });

  it(`should return error 'Email is invalid.'
  for the email with cyrillic letters and valid password`, () => {
    const invalidEnail = validateRegisterForm('тест@mail.com', 'P@ssword1!');

    expect(invalidEnail.code).toBe(422);
    expect(invalidEnail.message).toBe('Email is invalid.');
  });

  // Password is invalid

  it(`should return error 'Password is invalid.' 
  for valid email and password with 7 or less characters`, () => {
    const invalidPassword = validateRegisterForm('test.123@mail.com',
      'P@sswo1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error 'Password is invalid.' 
  for valid email and password with 17 or more characters`, () => {
    const invalidPassword = validateRegisterForm('test.123@mail.com',
      'P@ssword123456789');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error 'Password is invalid.' 
  for valid email and password withot at least one special character`, () => {
    const invalidPassword = validateRegisterForm('test.123@mail.com',
      'P1ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error 'Password is invalid.' 
  for valid email and password withot at least one number`, () => {
    const invalidPassword = validateRegisterForm('test.123@mail.com',
      'P_ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error 'Password is invalid.' 
  for valid email and password that contain 
  at least one cyrillic letter`, () => {
    const invalidPassword = validateRegisterForm('test.123@mail.com',
      'пас_word1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // Email and password are invalid

  it(`should return error 'Password and email are invalid.'
  for invalid email and password`, () => {
    const invalidBoth = validateRegisterForm('te..st@mail.com',
      'password');

    expect(invalidBoth.code).toBe(500);
    expect(invalidBoth.message).toBe('Password and email are invalid.');
  });

  it(`should return error 'Password and email are invalid.'
  for invalid email and password`, () => {
    const invalidBoth = validateRegisterForm('testmail.com',
      'P@ss1');

    expect(invalidBoth.code).toBe(500);
    expect(invalidBoth.message).toBe('Password and email are invalid.');
  });
});
