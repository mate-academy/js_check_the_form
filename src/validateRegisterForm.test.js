'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return an object with code and message`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1!');
    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('message');
  });

  describe('Password validation', () => {
    it('should return 422 if password missing special character', () => {
      expect(validateRegisterForm('test@mail.com', 'Password1')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 422 if password missing uppercase letter', () => {
      expect(validateRegisterForm('test@mail.com', 'password1!')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 200 for valid password with Cyrillic letters', () => {
      expect(validateRegisterForm('test@mail.com', 'ПарольA1!')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });

    it('should return 422 if password too short (<8)', () => {
      expect(validateRegisterForm('test@mail.com', 'A1$aB')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 422 if password too long (>16)', () => {
      expect(validateRegisterForm('test@mail.com', 'A1$aaaaaaaaaaaaaaa')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 200 for password of length 8 and 16', () => {
      expect(validateRegisterForm('test@mail.com', 'A1$aBcdE')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
      expect(validateRegisterForm('test@mail.com', 'A1$aBcdEfghijklM')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });
  });

  describe('Email validation', () => {
    it('should return 200 for emails with allowed specials in local part', () => {
      expect(validateRegisterForm('user+tag@mail.com', 'P@ssword1!')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
      expect(validateRegisterForm("user!name@mail.com", 'P@ssword1!')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });

    it('should return 422 for email starting with dot', () => {
      expect(validateRegisterForm('.user@mail.com', 'P@ssword1!')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for email ending with dot', () => {
      expect(validateRegisterForm('user.@mail.com', 'P@ssword1!')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for TLD/domain starting with dot', () => {
      expect(validateRegisterForm('user@.com', 'P@ssword1!')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for email with double dots', () => {
      expect(validateRegisterForm('user@mail..com', 'P@ssword1!')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 422 for missing @ symbol', () => {
      expect(validateRegisterForm('user.mail.com', 'P@ssword1!')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });
  });

  describe('Combined validation', () => {
    it('should return 500 if both email and password are invalid', () => {
      expect(validateRegisterForm('user.mail.com', 'password')).toEqual({
        code: 500,
        message: 'Password and email are invalid.',
      });
    });

    it('should return 422 if only password is invalid', () => {
      expect(validateRegisterForm('test@mail.com', 'password')).toEqual({
        code: 422,
        message: 'Password is invalid.',
      });
    });

    it('should return 422 if only email is invalid', () => {
      expect(validateRegisterForm('user.mail.com', 'P@ssword1!')).toEqual({
        code: 422,
        message: 'Email is invalid.',
      });
    });

    it('should return 200 if both email and password are valid', () => {
      expect(validateRegisterForm('test@mail.com', 'P@ssword1!')).toEqual({
        code: 200,
        message: 'Email and password are valid.',
      });
    });
  });
});
