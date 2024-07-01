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
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  describe(`Requirements for the valid password:`, () => {
    it(`should return success for a valid password with letters Aa-Zz`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for a password without letters`, () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', '12345678@!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should return success valid pass with at least 8 characters`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for a password with less than 8 characters`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@1!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should return success for valid pass with max of 16 characters`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!Long');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for pass with more than 16 characters`, () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'P@ssword1!LongLong');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`should return success valid passcontaining at least 1 digit`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for a password without any digits`, () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com', 'P@ssword!');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });
  });

  describe(`Requirements for the valid email:`, () => {
    it(`should return success for a valid email with English letters`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for an email without English letters`, () => {
      const invalidEmail = validateRegisterForm(
        'Илья@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return success for a valid email with digits`, () => {
      const isValid = validateRegisterForm('test123@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for an email without digits`, () => {
      const invalidEmail = validateRegisterForm('test@com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it('should return success for valid email with special characters', () => {
      const isValid = validateRegisterForm('test123@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for email with invalid special characters`, () => {
      const invalidEmail = validateRegisterForm('test@!mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return success for a valid email with periods`, () => {
      const isValid = validateRegisterForm('test.mail@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for an email with periods at the start`, () => {
      const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return error for an email with periods at the end`, () => {
      const invalidEmail = validateRegisterForm('test.@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return error for an email with double dots`, () => {
      const invalidEmail = validateRegisterForm(
        'test..mail@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return success for a valid email with an "@" symbol`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for an email without an "@" symbol`, () => {
      const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return success for a valid email with a top-level'
      + 'domain not starting with a dot`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return success for valid email not starting with a dot`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for an email starting with a dot`, () => {
      const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return success for a valid email without double dots`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for an email with double dots`, () => {
      const invalidEmail = validateRegisterForm(
        'test..mail@mail.com', 'P@ssword1!'
      );

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`should return success for a valid email and valid password`, () => {
      const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });

    it(`should return error for a valid email and invalid password`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'password');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });
  });
});
