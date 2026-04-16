'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe(
      'object',
    );
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword2!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
      and password shorter than 8 chars`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@1234');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
      and password longer than 16 chars`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'Paaaaaaaaaaaaaaaaaaaaa@1234',
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email 
      and password without letters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', '@12345678');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for email without english chars', () => {
    const invalidEmail = validateRegisterForm('ф@gmail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for email with point at the start', () => {
    const invalidEmail = validateRegisterForm('.test@gmail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for email with point at the end', () => {
    const invalidEmail = validateRegisterForm('test@gmail.com.', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for email with two point one after other', () => {
    const invalidEmail = validateRegisterForm('test@gmail..com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for email without @', () => {
    const invalidEmail = validateRegisterForm('testgmail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for email with point at the startof domain`, () => {
    const invalidEmail = validateRegisterForm('test@.gmail.com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for email and password', () => {
    const result = validateRegisterForm('.test@gmail.com', 'P@ssword');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });
});
