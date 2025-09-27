'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return an object with code and message`, () => {
    const result = validateRegisterForm('P@ssword1!', 'test@mail.com');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('message');
  });

  describe('Password validation', () => {
    it('should return 422 if password missing special character', () => {
      expect(validateRegisterForm('Password1', 'test@mail.com')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 422 if password missing uppercase letter', () => {
      expect(validateRegisterForm('password1!', 'test@mail.com')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 200 for valid password with Cyrillic letters', () => {
      expect(validateRegisterForm('ПарольA1!', 'test@mail.com')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });

    it('should return 422 if password too short (<8)', () => {
      expect(validateRegisterForm('A1$aB', 'test@mail.com')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 422 if password too long (>16)', () => {
      expect(validateRegisterForm('A1$aaaaaaaaaaaaaaa', 'test@mail.com')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 200 for password of length 8 and 16', () => {
      expect(validateRegisterForm('A1$aBcdE', 'test@mail.com')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
      expect(validateRegisterForm('A1$aBcdEfghijklM', 'test@mail.com')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });
  });

  describe('Email validation', () => {
    it('should return 200 for emails with allowed specials in local part', () => {
      expect(validateRegisterForm('P@ssword1!', 'user+tag@mail.com')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
      expect(validateRegisterForm('P@ssword1!', "user!name@mail.com")).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
      expect(validateRegisterForm('P@ssword1!', 'user%name@mail.com')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
      expect(validateRegisterForm('P@ssword1!', 'user_name@mail.com')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });

    it('should return 422 for email starting with dot', () => {
      expect(validateRegisterForm('P@ssword1!', '.user@mail.com')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for email ending with dot', () => {
      expect(validateRegisterForm('P@ssword1!', 'user.@mail.com')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for TLD/domain starting with dot', () => {
      expect(validateRegisterForm('P@ssword1!', 'user@.com')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for email with double dots in domain', () => {
      expect(validateRegisterForm('P@ssword1!', 'user@mail..com')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for email with double dots in local part', () => {
      expect(validateRegisterForm('P@ssword1!', 'user..name@mail.com')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for missing @ symbol', () => {
      expect(validateRegisterForm('P@ssword1!', 'user.mail.com')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });
  });

  describe('Combined validation', () => {
    it('should return 500 if both email and password are invalid', () => {
      expect(validateRegisterForm('password', 'user.mail.com')).toEqual({
        code: 500,
        message: 'Password and email are invalid.',
      });
    });

    it('should return 422 if only password is invalid', () => {
      expect(validateRegisterForm('password', 'test@mail.com')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 422 if only email is invalid', () => {
      expect(validateRegisterForm('P@ssword1!', 'user.mail.com')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 200 if both email and password are valid', () => {
      expect(validateRegisterForm('P@ssword1!', 'test@mail.com')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });
  });
});
