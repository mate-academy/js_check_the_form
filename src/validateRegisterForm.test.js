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

    
  it(`should return success message for valid email and valid password with cyrillic letters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Перевірка1!');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
  
  it(`should return error for valid email and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'password1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
  
  it(`should return error for valid email and password without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
  
  it(`should return error for valid email and password with 7 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Passw1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
  
  it(`should return error for valid email and password with 17 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Passwordqwerty12!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
  
  it(`should return error for valid password and email without 'personal_info' part`, () => {
    const invalidEmail = validateRegisterForm('@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email without 'domain' part`, () => {
    const invalidEmail = validateRegisterForm('@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email without @`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email without @`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email with cyrillic letters`, () => {
    const invalidEmail = validateRegisterForm('емейл@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email that begins with dot`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email that ends with dot`, () => {
    const invalidEmail = validateRegisterForm('test@mail.com.', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email where 'domain' part begins with dot`, () => {
    const invalidEmail = validateRegisterForm('test@.mail.com', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email that contains consecutive dots`, () => {
    const invalidEmail = validateRegisterForm('test..q@mail.com.', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email with double dots`, () => {
    const invalidEmail = validateRegisterForm('test:q@mail.com.', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });
  
  it(`should return error for valid password and email with not allowed characters`, () => {
    const invalidEmail = validateRegisterForm('test!q@mail.com.', 'Password1!');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for the invalid input`, () => {
    const inValid = validateRegisterForm('testmail.com', 'Pass1!');

    expect(inValid.code).toBe(500);
    expect(inValid.message).toBe('Password and email are invalid.');
  });
});
