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
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for the invalid input`, () => {
    const isInvalid = validateRegisterForm('test@com', 'P@ssword!');

    expect(isInvalid.code).toBe(500);
    expect(isInvalid.message).toBe('Password and email are invalid.');
  });

  describe('password', () => {
    it('should accept a password with Cyrillic letters', () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'П@роль1!');

      expect(invalidPassword.code).toBe(200);
      expect(invalidPassword.message).toBe('Email and password are valid.');
    });

    it('should return error when password is shorter than 8 characters', () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw0r');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('should accept a password with exactly 8 characters', () => {
      const validPassword = validateRegisterForm('test@mail.com', 'P@ssw0rd');

      expect(validPassword.code).toBe(200);
      expect(validPassword.message).toBe('Email and password are valid.');
    });

    it('should return error when password is longer than 16 characters', () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com',
        'P@ssword1P@ssword',
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('should accept a password with exactly 16 characters', () => {
      const validPassword = validateRegisterForm(
        'test@mail.com',
        'P@ssword1P@sswor',
      );

      expect(validPassword.code).toBe(200);
      expect(validPassword.message).toBe('Email and password are valid.');
    });

    it(`should reject a password without a digit`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should reject a password without a special character`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'Password');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should reject a password without an uppercase letter`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });
  });

  describe('email', () => {
    it('should reject an email without @ ', () => {
      const invalidEmail = validateRegisterForm('testmail.com', 'P@ssw0rd');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('should reject an email starting with a dot', () => {
      const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssw0rd');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('should reject an email ending with a dot', () => {
      const invalidEmail = validateRegisterForm('test@mail.com.', 'P@ssw0rd');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('should reject an email with consecutive dots', () => {
      const invalidEmail = validateRegisterForm('test@mail..com', 'P@ssw0rd');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('should accept allowed special characters in email', () => {
      const validEmail = validateRegisterForm('test+user@mail.com', 'P@ssw0rd');

      expect(validEmail.code).toBe(200);
      expect(validEmail.message).toBe('Email and password are valid.');
    });

    it(
      `should reject an email with a dot` + ` at the beginning of the domain`,
      () => {
        const invalidEmail = validateRegisterForm('test@.mail.com', 'P@ssw0rd');

        expect(invalidEmail.code).toBe(422);
        expect(invalidEmail.message).toBe('Email is invalid.');
      },
    );
  });
});
