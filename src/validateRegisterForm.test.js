'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  // A password can't contain Аа-Яя.
  // An email can't contain special chars.
  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('te.st123@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  describe('password', () => {
    describe('length', () => {
      it('less than 8 chars', () => {
        const invalidPassword = validateRegisterForm(
          'test@mail.com',
          'P@sswr1',
        );

        expect(invalidPassword.code).toBe(422);
        expect(invalidPassword.message).toBe('Password is invalid.');
      });

      it('exactly 8 chars', () => {
        const invalidPassword = validateRegisterForm(
          'test@mail.com',
          'P@sswo1!',
        );

        expect(invalidPassword.code).toBe(200);
        expect(invalidPassword.message).toBe('Email and password are valid.');
      });

      it('exactly 16 chars', () => {
        const invalidPassword = validateRegisterForm(
          'test@mail.com',
          'P@ssword1!oooooo',
        );

        expect(invalidPassword.code).toBe(200);
        expect(invalidPassword.message).toBe('Email and password are valid.');
      });

      it('more than 16 chars', () => {
        const invalidPassword = validateRegisterForm(
          'test@mail.com',
          'P@ssword1!ooooooo',
        );

        expect(invalidPassword.code).toBe(422);
        expect(invalidPassword.message).toBe('Password is invalid.');
      });
    });

    describe('content', () => {
      it('without number', () => {
        const invalidPassword = validateRegisterForm(
          'test@mail.com',
          'P@ssword!',
        );

        expect(invalidPassword.code).toBe(422);
        expect(invalidPassword.message).toBe('Password is invalid.');
      });

      it('without special char', () => {
        const invalidPassword = validateRegisterForm(
          'test@mail.com',
          'Pssword1',
        );

        expect(invalidPassword.code).toBe(422);
        expect(invalidPassword.message).toBe('Password is invalid.');
      });

      it('without uppercase letter', () => {
        const invalidPassword = validateRegisterForm(
          'test@mail.com',
          'p@ssword1!',
        );

        expect(invalidPassword.code).toBe(422);
        expect(invalidPassword.message).toBe('Password is invalid.');
      });
    });
  });

  describe('email', () => {
    describe('local part', () => {
      it('starts with dot', () => {
        const invalidEmail = validateRegisterForm(
          '.test@mail.com',
          'P@ssword1!',
        );

        expect(invalidEmail.code).toBe(422);
        expect(invalidEmail.message).toBe('Email is invalid.');
      });

      it('double dots', () => {
        const invalidEmail = validateRegisterForm(
          'te..st@mail.com',
          'P@ssword1!',
        );

        expect(invalidEmail.code).toBe(422);
        expect(invalidEmail.message).toBe('Email is invalid.');
      });

      it('ends with dot', () => {
        const invalidEmail = validateRegisterForm(
          'test.@mail.com',
          'P@ssword1!',
        );

        expect(invalidEmail.code).toBe(422);
        expect(invalidEmail.message).toBe('Email is invalid.');
      });
    });

    describe('domain', () => {
      it('starts with dot', () => {
        const invalidEmail = validateRegisterForm(
          'test@.mail.com',
          'P@ssword1!',
        );

        expect(invalidEmail.code).toBe(422);
        expect(invalidEmail.message).toBe('Email is invalid.');
      });

      it('ends with dot', () => {
        const invalidEmail = validateRegisterForm(
          'test.@mail.com.',
          'P@ssword1!',
        );

        expect(invalidEmail.code).toBe(422);
        expect(invalidEmail.message).toBe('Email is invalid.');
      });
    });

    it('without @', () => {
      const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword1!');

      expect(invalidEmail.code).toBe(422);
      expect(invalidEmail.message).toBe('Email is invalid.');
    });
  });
});
