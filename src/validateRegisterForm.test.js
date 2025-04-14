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

  // valid email

  it(`should return error for valid email and 
  password with 17 char length`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword123456789');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and 
  password with spase`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P @ ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and 
  password with 7 char length`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswo1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
   password without special char`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
   password without capital letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and
   password with not Latin letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'П@р0ль123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // valid password

  it(`should return error for valid password and 
  email with not Latin letter`, () => {
    const invalidPassword = validateRegisterForm('тест@почта.ком', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and 
  email without '@'`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and 
  email start from '.'`, () => {
    const invalidPassword = validateRegisterForm('.test@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and 
  email with double '.' one after another`, () => {
    const invalidPassword = validateRegisterForm('test..@mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and 
  email with two '@'`, () => {
    const invalidPassword = validateRegisterForm('t@st@mail.com', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and 
  email with spase`, () => {
    const invalidPassword = validateRegisterForm('test @ mail.com',
      'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and 
  email without domain`, () => {
    const invalidPassword = validateRegisterForm('test@', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and 
  email without '.'`, () => {
    const invalidPassword = validateRegisterForm('test@mailcom', 'P@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid input`, () => {
    const invalidPassword
    = validateRegisterForm('test..mail com', 'password');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
