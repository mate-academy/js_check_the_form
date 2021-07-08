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

  it(`should return error for valid email 
  and password without at least one special symbol`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
  and password without at least one uppercase character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for blank email and blank password`, () => {
    const invalidPassword = validateRegisterForm('', '');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });

  it(`should return error for invalid email and invalid password`, () => {
    const invalidPassword = validateRegisterForm('test', 'pass');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email and 3 symbol length password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and 7 symbol length password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw0r');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email 
  and 8 symbol length valid password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw0rd');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid email 
  and 16 symbol length valid password`, () => {
    // eslint-disable-next-line max-len
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw0rd12345678');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email 
  and 17 symbol length password`, () => {
    // eslint-disable-next-line max-len
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw0rd123456789');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
  and 20 symbol length password`, () => {
    // eslint-disable-next-line max-len
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw0rd123456789123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for 
  email with only domain part and valid password`, () => {
    const invalidPassword = validateRegisterForm('@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for 
  email without domain part and valid password`, () => {
    const invalidPassword = validateRegisterForm('test', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for 
  email without "@" symbol and valid password`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for 
  email which contains non-latin symbol(s) and valid password`, () => {
    const invalidPassword = validateRegisterForm('你est@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for 
  email which contains special characters and valid password`, () => {
    // eslint-disable-next-line max-len
    const invalidPassword = validateRegisterForm('test!!!@mail.com', 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });
});
