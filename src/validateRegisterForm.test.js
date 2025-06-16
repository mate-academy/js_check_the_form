'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  let emailFixture;
  let passwordFixture;

  beforeEach(() => {
    emailFixture = 'test@mail.com';
    passwordFixture = 'P@ssword1!';
  });

  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe(
      'object'
    );
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('should return status-code "500" if all of inputs are invalid', () => {
    const result = validateRegisterForm('123', '123');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });

  describe('password validation', () => {
    it(`should return error for valid email
       and password without number`, () => {
      const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe('Password is invalid.');
    });

    it('should return error if password have less as 8 characters', () => {
      passwordFixture = 'P@sswo!';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Password is invalid.');
    });

    it('should return error if password dont have big letter', () => {
      passwordFixture = 'p@ssword1!';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Password is invalid.');
    });

    it('should return error if password are greater than 16', () => {
      passwordFixture = 'p@ssword1!dfghjkljhgfdsadcfvgbnm,';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Password is invalid.');
    });

    it(`should return error if
       password without min one special charakter`, () => {
      passwordFixture = 'Password1';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Password is invalid.');
    });
  });

  describe('email validation', () => {
    it('should accept email only with english letters', () => {
      emailFixture = 'микола@стесюк.gmail.com';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Email is invalid.');
    });

    it('should return error if email without "@"', () => {
      emailFixture = 'testmail.com';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Email is invalid.');
    });

    it('should accept emails with only valid domains', () => {
      emailFixture = 'test@com';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Email is invalid.');
    });

    it('should return error if email starts with "."', () => {
      emailFixture = '.test@gmail.com';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Email is invalid.');
    });

    it('should not allow double dots', () => {
      emailFixture = 'test...@gmail..com';

      const result = validateRegisterForm(emailFixture, passwordFixture);

      expect(result.code).toBe(422);
      expect(result.message).toBe('Email is invalid.');
    });
  });
});
