'use strict';

/* eslint-disable max-len */

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`returns a success message for a valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('returns an error message if both the email and the password are invalid', () => {
    const isInvalid = validateRegisterForm('test.@mail.com', '');

    expect(isInvalid.code).toBe(500);
    expect(isInvalid.message).toBe('Password and email are invalid.');
  });

  describe('password tests', () => {
    it(`contains at least 1 digit, 1 special character, and 1 uppercase letter`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword1');

      expect(invalidPassword.code).toBe(200);
      expect(invalidPassword.message).toBe('Email and password are valid.');
    });

    it('is longer than 8 characters', () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'W@w!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('is shorter than 16 characters', () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'W@w!beqvwecqwsxWVDQCS');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('accepts both Latin and Cyrillic characters', () => {
      const isValid = validateRegisterForm('test@mail.com', 'Abc1@Бqwe');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });
  });

  describe('email tests', () => {
    it('accepts only Latin characters', () => {
      const invalidEmail = validateRegisterForm('testЙ@mail.com', 'P@ssword1');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('accepts special characters', () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`doesn't start with a dot`, () => {
      const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('dots cannot be consecutive', () => {
      const invalidEmail = validateRegisterForm('t...est@.mail.com', 'P@ssword1');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`doesn't have a dot before @`, () => {
      const invalidEmail = validateRegisterForm('test.@mail.com', 'P@ssword1');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('@ is required', () => {
      const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('top level domain cannot start with a dot', () => {
      const invalidEmail = validateRegisterForm('test@.mail.com', 'P@ssword1');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('top level domain is required', () => {
      const invalidEmail = validateRegisterForm('test@', 'P@ssword1');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });
  });
});
