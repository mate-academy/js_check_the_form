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

  it(`should return code 500 and fail message
  for the invalid "email" and "password"`, () => {
    const isValid = validateRegisterForm('te:st@mail.com', 'Password1');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });

  describe('email', () => {
    it(`should return code 422 and message Email is invalid.
  if email has characters outside of \`Aa-Zz, 0-9\``, () => {
      const invalidPassword
        = validateRegisterForm('testŞ@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should return code 422 and message Email is invalid.
  if email has characters outside of \`Aa-Zz, 0-9\``, () => {
      const invalidPassword
        = validateRegisterForm('testС@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should not contain spaces`, () => {
      const invalidPassword
        = validateRegisterForm('tes t@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should contain '@'`, () => {
      const invalidPassword
        = validateRegisterForm('testmail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should contain only one '@'`, () => {
      const invalidPassword
        = validateRegisterForm('test@@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should contain a dot`, () => {
      const invalidPassword
        = validateRegisterForm('test@mailcom', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should accept special characters`, () => {
      const invalidPassword
        = validateRegisterForm('%test#-|}one!$@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should accept digits`, () => {
      const invalidPassword
        = validateRegisterForm('0test12@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(200);
      expect(invalidPassword.message).toBe('Email and password are valid.');
    });

    it(`should not have a dot as the first character`, () => {
      const invalidPassword
        = validateRegisterForm('.test@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`domain should not start with a dot`, () => {
      const invalidPassword
        = validateRegisterForm('test@.mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should not have double dots in a row`, () => {
      const invalidPassword
        = validateRegisterForm('te:st@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should not have two or more dots in a row`, () => {
      const invalidPassword
        = validateRegisterForm('te...st@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Email is invalid.');
    });

    it(`should accept a dot in email body`, () => {
      const invalidPassword
        = validateRegisterForm('te.st@mail.com', 'Password1!');

      expect(invalidPassword.code).toBe(200);
      expect(invalidPassword.message).toBe('Email and password are valid.');
    });
  });

  describe('password', () => {
    it(`should contain at least one number`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should accept\`Aa-Яя\` letters`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'ЯP@ssword1я');

      expect(invalidPassword.code).toBe(200);
      expect(invalidPassword.message).toBe('Email and password are valid.');
    });

    it(`should be at least 8 chars long`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'P@ss123');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should not be more than 16 chars long`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'P@ss1234567891011');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should accept 16 chars length`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'P@ss123456789101');

      expect(invalidPassword.code).toBe(200);
      expect(invalidPassword.message).toBe('Email and password are valid.');
    });

    it(`should not accept spaces`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'P@ss12ssd f');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should not contain at least 1 digit`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'P@ssssdf');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should not contain at least 1 special character`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'Pssssdf1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should not contain at least 1 uppercase letter`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'p@ssssdf1');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });
  });
});
