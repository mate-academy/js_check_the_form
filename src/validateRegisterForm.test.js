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
    const invalidPassword = validateRegisterForm(
      'test@mail.com',
      'P@ssword'
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for invalid email and valid password`, () => {
    const invalidEmail = validateRegisterForm(
      'test@com',
      'P@ssword1!'
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and invalid password`, () => {
    const invalidBoth = validateRegisterForm(
      'test@com',
      'ssword1'
    );

    expect(invalidBoth.code).toBe(500);
    expect(invalidBoth.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email and too short password`, () => {
    const result = validateRegisterForm(
      'valid@email.com',
      'P@s1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password longer than 16 characters`, () => {
    const longPassword = 'P@ssword1!LongText';

    const result = validateRegisterForm(
      'valid@email.com',
      longPassword
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should error for password missing uppercase', () => {
    const result = validateRegisterForm(
      'valid@email.com',
      'p@ssword1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it('should error for password missing special char', () => {
    const result = validateRegisterForm(
      'valid@email.com',
      'Passw0rd12'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for email missing the '@' symbol`, () => {
    const missingAt = validateRegisterForm(
      'testmail.com',
      'P@ssword1!'
    );

    expect(missingAt.code).toBe(422);
    expect(missingAt.message).toBe('Email is invalid.');
  });

  it(
    `should error for email with period before @`,
    () => {
      const invalidDot = validateRegisterForm(
        'test.@example.com',
        'P@ssword1!'
      );

      expect(invalidDot.code).toBe(422);
      expect(invalidDot.message).toBe('Email is invalid.');
    }
  );

  it('should accept valid password containing Cyrillic letters', () => {
    const result = validateRegisterForm(
      'valid@email.com',
      'P@ssword!1A'
    );

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it('should return error for email starting with a dot', () => {
    const result = validateRegisterForm(
      '.test@example.com',
      'P@ssword1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it('should return error for email with consecutive dots', () => {
    const result = validateRegisterForm(
      'test..dots@example.com',
      'P@ssword1!'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });
});
