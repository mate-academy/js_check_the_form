'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it('should be declared', () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it('should return object', () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  describe('Email and password validation', () => {
    it('should return success message for the valid input for'
       + 'email and latin letters in password', () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it('should return success message for the valid input'
       + 'for email and cyrillic letters in password', () => {
      const isValid = validateRegisterForm('test@mail.com', 'П!фплжь1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it('should return error for the invalid input for'
       + 'email and password', () => {
      const isValid = validateRegisterForm('test', 'P@ssw1');

      expect(isValid.code).toBe(500);
      expect(isValid.message).toBe('Password and email are invalid.');
    });
  });

  describe('Email validation with valid password', () => {
    it('should return error for invalid email with cyrillic letters', () => {
      const invalidEmail = validateRegisterForm('тест@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('should return success message for email that contains digits', () => {
      const invalidEmail = validateRegisterForm('test1@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(200);
      expect(invalidEmail.message).toBe('Email and password are valid.');
    });

    it(`should return error for invalid email with double dots '..'`, () => {
      const invalidEmail = validateRegisterForm(
        'te..st@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return error for invalid email that start with '.'`, () => {
      const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return error for invalid email with '.' as
      last char`, () => {
      const invalidEmail = validateRegisterForm('test@mail.com.', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return error for invalid email without '@'`, () => {
      const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return error for invalid email that start with '.'
      in top Level domain`, () => {
      const invalidEmail = validateRegisterForm('testmail..com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });
  });

  describe('Password validation with valid email', () => {
    it('should return error for password without number', () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('should return error for password without special char', () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'Password1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('should return error for password without uppercase letter', () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'p@ssword1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('should return error for password with more than 16 char', () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'P@ssword1P@ssword');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('should return success message for password with 16 char', () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssw0rdP@ssw0rd');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it('should return error for password with less than 8 char', () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('should return success message for password with 8 char', () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssw0rd');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });
  });
});
