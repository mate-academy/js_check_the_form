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

  describe(`should return '200' and message 'Email`
    + ` and password are valid.'`, () => {
    it(`for password length between 8 and 16 Latin letters,`
    + ` 1 digit, 1 special character, 1 uppercase letter`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`for password length between 8 and 16 Cyrilic letters,`
    + ` 1 digit, 1 special character, 1 uppercase letter`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'Ки@иллица1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`for email that contain personal and domain`
      + ` parts separated by @`, () => {
      const isValid = validateRegisterForm('test1@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`for email that contain special symbols`, () => {
      const isValid = validateRegisterForm('_test2@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });
  });

  describe(`should return '422' and message 'Email is invalid.'`, () => {
    it(`for email with missed @ symbol`, () => {
      const invalidEmail = validateRegisterForm('invalid.email_example.com',
        'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`for email with double dot`, () => {
      const invalidEmail = validateRegisterForm('invalid..email@example.com',
        'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`for email that starts with dot`, () => {
      const invalidEmail = validateRegisterForm('.invalid@example.com',
        'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`for email that ends with dot`, () => {
      const invalidEmail = validateRegisterForm('invalid.@example.com',
        'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });
  });

  describe(`should return '422' and message 'Password is invalid.'`, () => {
    it(`for too small password length`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswd1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`for too big password length`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com',
        'P@ssword1!P@ssword1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`for password without special character`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com',
        'Password1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`for password without digit`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com',
        'P@ssword!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });
  });

  describe(`should return '500' and message 'Password`
    + ` and email are invalid.'`, () => {
    it(`for empty password and email`, () => {
      const isInvalid = validateRegisterForm('', '');

      expect(isInvalid.code).toBe(500);
      expect(isInvalid.message).toBe('Password and email are invalid.');
    });
  });
});
