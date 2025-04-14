'use strict';

const { validateRegisterForm } = require('./validateRegisterForm');

describe(`Function 'validateRegisterForm':`, () => {
  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test-user1@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  // The test below was written for the requirements for the valid password
  // - accepts letters `Aa-Zz, Aa-Яя`;
  it(`should return success message for the valid input `
    + `if password contains 'Aa-Яя' letters`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'НовийП@роль1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  describe(`return error for invalid password:`, () => {
    it(`password without number`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`password without special character`, () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com',
        'Password1'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`password without uppercase letter`, () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com',
        'p@ssword1'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`password with less than 8 characters`, () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com',
        'P@sswo1'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it(`password with more than 16 characters`, () => {
      const invalidPassword = validateRegisterForm(
        'test@mail.com',
        'P@ssword1wordpass'
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });
  });

  describe(`return error for invalid email:`, () => {
    it(`without '@' symbol`, () => {
      const invalidEmail = validateRegisterForm(
        'testmail.com',
        'P@ssword1'
      );

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`with '.' before the top-level domain`, () => {
      const invalidEmail = validateRegisterForm(
        'test@.mail.com',
        'P@ssword1'
      );

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`with '.' at the beginning of the email`, () => {
      const invalidEmail = validateRegisterForm(
        '.test@mail.com',
        'P@ssword1'
      );

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    /*
    The test below reflects the requirements for the valid email:
    [Character `.` ( period, dot or fullstop) provided that it is not
    the first or last character and it will not come one after the other]
    */
    it(`with '.' at the end of the email`, () => {
      const invalidEmail = validateRegisterForm(
        'test@mail.com.',
        'P@ssword1'
      );

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });

    it(`with sequential dots in the name part`, () => {
      const invalidEmail = validateRegisterForm(
        'test..user@mail.com',
        'P@ssword1'
      );

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });
  });

  it(`return error message for the invalid input`, () => {
    const isInvalid = validateRegisterForm(
      'test..user@mail.com',
      'P@ssword'
    );

    expect(isInvalid.code).toBe(500);
    expect(isInvalid.message).toBe('Password and email are invalid.');
  });
});
