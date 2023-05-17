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
    const isValid = validateRegisterForm(`test@mail.com`,
      'P@ssworБГвдd1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm(`test@mail.com`,
      'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password 
  without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
  and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
  and password with 4 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@d1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
  and password with 7 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@swrd1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email 
  and password with 8 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@sswrd1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid email 
  and password with 9 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@sswrd1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid email 
  and password with 15 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssssssssswrd1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid email 
  and password with 16 characters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssssssssswwrd1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for valid email 
  and password with 17 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssssssssswwrdd1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email 
  and password with 20 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@sssssssssswwrdddd1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for valid email 
  and empty password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', '');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for email with non-English 
  letters and valid password `, () => {
    const invalidEmail = validateRegisterForm('тест@mail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return success message for email 
  with numbers and valid password `, () => {
    const isValid = validateRegisterForm('test1234@mail.com',
      'P@ssssssssswwrd1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it.skip(`should return success message for email with a special 
  character and valid password `, () => {
    const isValid = validateRegisterForm('test!@mail.com', 'P@ssword1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for email with a dot 
  at the start and valid password `, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it.skip(`should return error for email with a dot 
  at the end and valid password `, () => {
    const invalidEmail = validateRegisterForm('test@mail.com.', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with 2 dots 
  in a row and valid password `, () => {
    const invalidEmail = validateRegisterForm('te..st@mail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return success message for email 
  with dots not in a row and valid password `, () => {
    const isValid = validateRegisterForm('t.e.s.t@mail.com',
      'P@ssword1');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for email with no '@' 
  and valid password `, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and invalid password `, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'p@ssword1');

    expect(invalidEmail.code).toBe(500);
    expect(invalidEmail.message).toBe('Password and email are invalid.');
  });
});
