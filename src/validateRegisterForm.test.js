'use strict';

const validateRegisterForm = require('./validateRegisterForm');

const validEmail = 'test@mail.com';
const validPassword = 'P@ssword1!';

describe(`Function 'validateRegisterForm':`, () => {
  it('should be declared', () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it('should return an object', () => {
    const result = validateRegisterForm(validEmail, validPassword);

    expect(typeof result).toBe('object');
  });

  it('should return success message for valid input', () => {
    const result = validateRegisterForm(validEmail, validPassword);

    expect(result).toEqual({
      code: 200,
      message: 'Email and password are valid.',
    });
  });

  it('should return email error for invalid email and valid password', () => {
    const result = validateRegisterForm('invalid-email', validPassword);

    expect(result).toEqual({
      code: 422,
      message: 'Email is invalid.',
    });
  });

  it(
    'should return password error for valid email ' + 'and invalid password',
    () => {
      const result = validateRegisterForm(validEmail, 'password');

      expect(result).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    },
  );

  it('should return email and password error when both are invalid', () => {
    const result = validateRegisterForm('invalid-email', 'password');

    expect(result).toEqual({
      code: 500,
      message: 'Password and email are invalid.',
    });
  });

  describe('password validation', () => {
    it('should reject a password shorter than 8 characters', () => {
      const result = validateRegisterForm(validEmail, 'Pa1!aaa');

      expect(result).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should accept a password with exactly 8 characters', () => {
      const result = validateRegisterForm(validEmail, 'Passw1!A');

      expect(result).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });

    it('should accept a password with exactly 16 characters', () => {
      const result = validateRegisterForm(validEmail, 'Password12345!AB');

      expect(result).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });

    it('should reject a password longer than 16 characters', () => {
      const result = validateRegisterForm(validEmail, 'Password123456789!');

      expect(result).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should reject a password without an uppercase letter', () => {
      const result = validateRegisterForm(validEmail, 'password1!');

      expect(result).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should reject a password without a lowercase letter', () => {
      const result = validateRegisterForm(validEmail, 'PASSWORD1!');

      expect(result).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should reject a password without a digit', () => {
      const result = validateRegisterForm(validEmail, 'Password!');

      expect(result).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should reject a password without a special character', () => {
      const result = validateRegisterForm(validEmail, 'Password1');

      expect(result).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should reject a password containing whitespace', () => {
      const result = validateRegisterForm(validEmail, 'Password 1!');

      expect(result).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should accept a password containing Cyrillic letters', () => {
      const result = validateRegisterForm(validEmail, 'Пароль1!А');

      expect(result).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });
  });

  describe('email validation', () => {
    it('should reject an email without @', () => {
      const result = validateRegisterForm('testmail.com', validPassword);

      expect(result).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should reject an email starting with a dot', () => {
      const result = validateRegisterForm('.test@mail.com', validPassword);

      expect(result).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should reject an email with double dots', () => {
      const result = validateRegisterForm('test..user@mail.com', validPassword);

      expect(result).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should reject an email ending with a dot before @', () => {
      const result = validateRegisterForm('test.@mail.com', validPassword);

      expect(result).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should reject an email with a domain starting with a dot', () => {
      const result = validateRegisterForm('test@.mail.com', validPassword);

      expect(result).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should reject an email without a local part', () => {
      const result = validateRegisterForm('@mail.com', validPassword);

      expect(result).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should reject an email without a domain', () => {
      const result = validateRegisterForm('test@', validPassword);

      expect(result).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should reject an email without a top-level domain', () => {
      const result = validateRegisterForm('test@mail', validPassword);

      expect(result).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should accept digits in an email', () => {
      const result = validateRegisterForm('test123@mail.com', validPassword);

      expect(result).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });

    it('should accept an allowed special character in an email', () => {
      const result = validateRegisterForm('test+user@mail.com', validPassword);

      expect(result).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });

    it('should accept a single dot in the local part', () => {
      const result = validateRegisterForm('test.user@mail.com', validPassword);

      expect(result).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });
  });
});
