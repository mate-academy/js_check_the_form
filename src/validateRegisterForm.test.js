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

  it(`should return error for valid password and email with Cyrillic`, () => {
    const isValid = validateRegisterForm('тест@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return success message for valid password
  and email with digits`, () => {
    const isValid = validateRegisterForm('test123@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid password and Character \`.\` 
  if it is not the first
  or last character and it will not come one after the other in email.`, () => {
    const isValid = validateRegisterForm('t.e.s.t@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for valid password and Character \`.\` 
  if it is the first character of email personal_info part`, () => {
    const isValid = validateRegisterForm('.t.e.s.t@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and Character \`.\` 
  if it is the last character of email personal_info part`, () => {
    const isValid = validateRegisterForm('t.e.s.t.@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and Character \`.\` 
  if it come one after the other of email the personal_info part`, () => {
    const isValid = validateRegisterForm('te..st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and
  if email doesn't contain '@' character`, () => {
    const isValid = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and Character \`.\` 
  if top Level domain can not start with dot \`.\` in email`, () => {
    const isValid = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and
  if an email start with \`.\``, () => {
    const isValid = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and
  if double dots are not allowed in email`, () => {
    const isValid = validateRegisterForm('te:st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return success message for valid email and
  if password contain English letters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for valid email and
  if password contain Cyrillic letters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'П@рольd1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error message for valid email and
  if password contain with 7 characters and valided`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssd1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email and
  if password contain with 8 characters and valided`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@sswor1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid email and
  if password contain with 16 characters and valided`, () => {
    const isValid = validateRegisterForm('test@mail.com', '123456P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for valid email and
  if password contain with 17 characters and valided`, () => {
    const isValid = validateRegisterForm('test@mail.com', '1234567P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error message for valid email and
  if password contain with valid length,
  contain 1 special character, 1 uppercase letter but without 1 digit`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error message for valid email and
  if password contain with valid length,
  contain 1 digit, 1 uppercase letter but without 1 special character`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'Password1');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error message for valid email and
  if password contain with valid length,
  contain 1 digit, 1 special character but without 1 uppercase letter`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error message
  if email and password are not valided`, () => {
    const isValid = validateRegisterForm('.test@mail.com', 'password1');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });
});
