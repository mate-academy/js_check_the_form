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

  describe('validate password', () => {
    it(`accepts letters Aa-Zz, Aa-Яя contains
      at least 1 digit, 1 special character, 1 uppercase letter`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`return error haven't a digit`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword!');

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });

    it(`return error haven't a special characters`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'Pssword2');

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });

    it(`return error haven't a uppercase letter`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'p@ssword2!');

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });

    it(`return error when password smaller than 8 characters`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'p@rd2!');

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });

    it(`return error when password bigger than 16 characters`, () => {
      const isValid = validateRegisterForm(
        'test@mail.com', 'p@radssadawdawwwaddssd2!',
      );

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });
  });

  describe('validate email', () => {
    it(`accepts letters Aa-Zz, digits, ! # $ % & ' * + - / = ? ^ _ \` { | } ~
    @ is required`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`return error for email without domain`, () => {
      const invalidPassword = validateRegisterForm('test@com', 'P@ssword1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`return error for email contain double dots`, () => {
      const invalidPassword = validateRegisterForm('te:st@com.ua', 'P@ssword1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`return error for email starts with dot`, () => {
      const invalidPassword = validateRegisterForm('.test@com.ua', 'P@ssword1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`return error for email domain starts with dot`, () => {
      const invalidPassword = validateRegisterForm('test@.com.ua', 'P@ssword1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`return error for email ends with dot`, () => {
      const invalidPassword = validateRegisterForm('test.@com.ua', 'P@ssword1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });
  });
});
