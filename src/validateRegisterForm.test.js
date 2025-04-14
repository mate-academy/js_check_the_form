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

  it('should return error for invalid email and valid password', () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword123');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return 500 code and error message'
  + 'when email and password are invalid', () => {
    const invalidEmailPass = validateRegisterForm('test@com', 'a1234');

    expect(invalidEmailPass.code).toBe(500);
    expect(invalidEmailPass.message).toBe('Password and email are invalid.');
  });

  it('should return error for email with special characters', () => {
    const invalidEmail = validateRegisterForm('tes#@mail.com', 'Pas$word12');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error when email is starting from period', () => {
    const wrongEmail = validateRegisterForm('.test@mail.com', 'Password!1');

    expect(wrongEmail.code).toBe(422);
    expect(wrongEmail.message).toBe('Email is invalid.');
  });

  it('should return error for email ending with period', () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'Password!1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for double periods in email', () => {
    const invalidEmail = validateRegisterForm('te..st@mail.com', 'Password!1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return error for email without @', () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'Password!1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it('should return an error for password without letters', () => {
    const invalidPass = validateRegisterForm('test@mail.com', '12345678');

    expect(invalidPass.code).toBe(422);
    expect(invalidPass.message).toBe('Password is invalid.');
  });

  it('should return error for password without special characters', () => {
    const invalidPass = validateRegisterForm('test@mail.com', 'Password12');

    expect(invalidPass.code).toBe(422);
    expect(invalidPass.message).toBe('Password is invalid.');
  });

  it(`should return error for password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for password without uppercase letter', () => {
    const invalidPass = validateRegisterForm('test@mail.com', 'password!1');

    expect(invalidPass.code).toBe(422);
    expect(invalidPass.message).toBe('Password is invalid.');
  });

  it('should return error for password shorter then 8 characters', () => {
    const invalidPass = validateRegisterForm('test@mail.com', 'Word!1');

    expect(invalidPass.code).toBe(422);
    expect(invalidPass.message).toBe('Password is invalid.');
  });

  it('should return error for password'
  + 'with more than 16 characters', () => {
    const invPass = validateRegisterForm('test@mail.com', 'Password@pass1234');

    expect(invPass.code).toBe(422);
    expect(invPass.message).toBe('Password is invalid.');
  });
});
