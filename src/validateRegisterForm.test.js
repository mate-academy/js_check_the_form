'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe(
      'object'
    );
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('should return error when password is invalid but email is valid', () => {
    const isValid = validateRegisterForm('test@mail.com', '');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it('should return error when email is invalid but password is valid', () => {
    const isValid = validateRegisterForm('', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error when password has no special character', () => {
    const isValid = validateRegisterForm('test@mail.com', 'Passworda1');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it('should return error when password has no uppercase letter', () => {
    const isValid = validateRegisterForm('test@mail.com', 'p@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it('should return error when password is too short', () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ss1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it('should return error when password is too long', () => {
    const isValid = validateRegisterForm(
      'test@mail.com',
      'P@aaaaaaaaassword1!'
    );

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it('should return error when email does not contain @', () => {
    const isValid = validateRegisterForm('testamail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it('should return error when email starts with a dot', () => {
    const isValid = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it('should return error when top-level domain starts with a dot', () => {
    const isValid = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it('should return error when email contains double dots', () => {
    const isValid = validateRegisterForm('te:st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it('should return 422 if email contains forbidden characters', () => {
    const result = validateRegisterForm('тест@exam ple.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it('should return error when email starts or ends with a dot', () => {
    const isValid = validateRegisterForm('.test@mail.com.', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });
});
