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

  it(`should return success message for valid password 
  and email with valid character '.'`, () => {
    const isValid = validateRegisterForm('t.e.s.t@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for valid password and
  dot started of email personal_info part`, () => {
    const isValid = validateRegisterForm('.t.e.s.t@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and
  dot is the last character of email personal_info part`, () => {
    const isValid = validateRegisterForm('t.e.s.t.@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and
  dots come in a row of email personal_info part`, () => {
    const isValid = validateRegisterForm('te..st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and
  email doesn't contain '@' character`, () => {
    const isValid = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and
  email top Level domain started with dot`, () => {
    const isValid = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid password and
  email with double dots`, () => {
    const isValid = validateRegisterForm('te:st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error message for valid email and
  password contains Cyrillic letters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'П@рольd1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error message for valid email and
  password contains with 7 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssd1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email and
  password contains with 8 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@sswor1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid email and
  if password contains with 16 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', '123456P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for valid email and
  password contains with 17 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', '1234567P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error message for valid email and
  password without special character`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'Password1');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error message for valid email and
  password without uppercase letter`, () => {
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
