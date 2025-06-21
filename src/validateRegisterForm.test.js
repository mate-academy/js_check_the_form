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
    const isValid = validateRegisterForm('test@mail.com', 'P@sswo1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password < 8 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw21');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password > 16 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword211234567');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error for valid email and password without special symbol`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password2');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error for valid email and password without capital letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword2');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error for valid email and password with non-valid letters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', '你好@你好12D');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error valid password and for email with cyrillic letters`, () => {
    const invalidEmail = validateRegisterForm('тест@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  // eslint-disable-next-line max-len
  it('should return error message for email with each valid special character', () => {
    // eslint-disable-next-line max-len
    const specialChars = ['#', '$', '%', '&', "'", '*', '+', '/', '=', '?', '^', '`', '{', '|', '}', '~'];

    specialChars.forEach((char) => {
      const email = `t${char}_st-t@mail.com`;
      const result = validateRegisterForm(email, 'P@ssword2');

      expect(result.code).toBe(422);
      expect(result.message).toBe('Email is invalid.');
    });
  });

  // eslint-disable-next-line max-len
  it(`should return error valid password and for email with . at the start`, () => {
    const invalidEmail = validateRegisterForm('.test@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error valid password and for email with . at the end`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error valid password and for email with . one after the other`, () => {
    const invalidEmail = validateRegisterForm('te..st@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error valid password and for email without @`, () => {
    const invalidEmail = validateRegisterForm('testmail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error valid password and for email with . at the end`, () => {
    const invalidEmail = validateRegisterForm('test.@mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  // eslint-disable-next-line max-len
  it(`should return error valid password and for email with . at the end`, () => {
    const invalidEmail = validateRegisterForm('test@.mail.com', 'P@ssword2');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return error valid password and for email without .`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1');

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  // eslint-disable-next-line max-len
  it('should return success message for valid password and email with - and _ symbols', () => {
    const specialSymbols = validateRegisterForm('t_st-t@mail.com', 'P@ssword2'
    );

    expect(specialSymbols.code).toBe(200);
    expect(specialSymbols.message).toBe('Email and password are valid.');
  });

  // eslint-disable-next-line max-len
  it(`should return success message for the valid password and for email with cyrillic letters`, () => {
    const withCyrillic = validateRegisterForm('test123@mail.com', 'P@ssword2');

    expect(withCyrillic.code).toBe(200);
    expect(withCyrillic.message).toBe('Email and password are valid.');
  });

  it(`should return error when entered password and email are invalid`, () => {
    const invalidBoth = validateRegisterForm('testmail.com', 'P@ssword');

    expect(invalidBoth.code).toBe(500);
    expect(invalidBoth.message).toBe('Password and email are invalid.');
  });
});
