'use strict';

const validateRegisterForm = require('./validateRegisterForm');

describe('validateRegisterForm', () => {
  it('should be declared as a function', () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it('should return an object', () => {
    expect(
      typeof validateRegisterForm('test@mail.com', 'P@ssword1!')
    ).toBe('object');
  });

  it('should return success message for valid input', () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 200,
      message: 'Email and password are valid.',
    });
  });

  it(
    'should return error for valid email but invalid password (missing number)',
    () => {
      const result = validateRegisterForm('test@mail.com', 'P@ssword!');

      expect(result).toEqual({
        code: 422, message: 'Password is invalid.',
      });
    }
  );

  it(
    'should return error for valid email but invalid password '
    + '(missing special character)',
    () => {
      const result = validateRegisterForm('test@mail.com', 'Password1');

      expect(result).toEqual({
        code: 422, message: 'Password is invalid.',
      });
    }
  );

  it(
    'should return error for valid email but invalid password '
    + '(less than 8 characters)',
    () => {
      const result = validateRegisterForm('test@mail.com', 'P@ss1!');

      expect(result).toEqual({
        code: 422, message: 'Password is invalid.',
      });
    }
  );

  it('should return error for invalid email but valid password', () => {
    const result = validateRegisterForm('test@com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422, message: 'Email is invalid.',
    });
  });

  it('should return error for invalid email and invalid password', () => {
    const result = validateRegisterForm('test@com', 'password');

    expect(result).toEqual({
      code: 500,
      message: 'Password and email are invalid.',
    });
  });

  it('should return error for email with double dots', () => {
    const result = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');

    expect(result).toEqual(
      {
        code: 422, message: 'Email is invalid.',
      }
    );
  });

  it('should return error for email without @ symbol', () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422, message: 'Email is invalid.',
    });
  });

  it('should return error for email starting with a dot', () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result).toEqual({
      code: 422, message: 'Email is invalid.',
    });
  });
});
