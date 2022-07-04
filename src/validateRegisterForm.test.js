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

  describe(`Email field`, () => {
    it(`should contain only english letters`, () => {
      const invalidMail = validateRegisterForm('тест@mail.com', 'P@ssword1!');

      expect(invalidMail.message).toBe('Email is invalid.');
    });

    it(`should contain at least one digit`, () => {
      const invalidMail
        = validateRegisterForm('.test@mail.com', 'P@ssword1!');

      expect(invalidMail.message).toBe('Email is invalid.');
    });

    it(`should contain '@' symbol`, () => {
      const invalidMail
        = validateRegisterForm('testmail.com', 'P@ssword1!');

      expect(invalidMail.message).toBe('Email is invalid.');
    });

    it(
      `should contain correct top-level domain (gmail.com, diia.org etc)`,
      () => {
        const invalidMail
          = validateRegisterForm('test@gmail.c', 'P@ssword1!');

        expect(invalidMail.message).toBe('Email is invalid.');
      });

    it(
      `should not start with '@' symbol `,
      () => {
        const invalidMail
            = validateRegisterForm('@mail.com', 'P@ssword1!');

        expect(invalidMail.message).toBe('Email is invalid.');
      });

    it(`should not start with dot`, () => {
      const invalidMail
        = validateRegisterForm('.test@mail.com', 'P@ssword1!');

      expect(invalidMail.message).toBe('Email is invalid.');
    });

    it(`should not end with dot`, () => {
      const invalidMail
        = validateRegisterForm('test@mail.com.', 'P@ssword1!');

      expect(invalidMail.message).toBe('Email is invalid.');
    });

    it(`should not contain double dots`, () => {
      const invalidMail
        = validateRegisterForm('test@mail..com', 'P@ssword1!');

      expect(invalidMail.message).toBe('Email is invalid.');
    });
  });

  describe(`Password field`, () => {
    it(`should be at least 8 characters length`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'Q@c1');

      expect(invalidPassword.message).toEqual('Password is invalid.');
    });

    it(`should be maximum 16 characters length`, () => {
      const invalidPassword
        = validateRegisterForm('test@mail.com', 'Q@c34567890qwerty');

      expect(invalidPassword.message).toEqual('Password is invalid.');
    });

    it(`should contain at least one digit`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'Q!ertyui');

      expect(invalidPassword.message).toEqual('Password is invalid.');
    });

    it(`should contain at least one special character`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'Qwertyu1');

      expect(invalidPassword.message).toEqual('Password is invalid.');
    });

    it(`should contain at least one uppercase character`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'qwerty1!');

      expect(invalidPassword.message).toEqual('Password is invalid.');
    });
  });
});
