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

  it('should return correct message if password was not provided', () => {
    const passwordCheck = validateRegisterForm('test@mail.com', '');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Password is invalid.');
  });

  it('should be sensitive to the register', () => {
    const passwordCheck = validateRegisterForm('test@mail.com', 'p@ssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Password is invalid.');
  });

  it('should return correct message if email was not provided', () => {
    const passwordCheck = validateRegisterForm('', 'P@ssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Email is invalid.');
  });

  it('should be sensitive to spaces in email', () => {
    const passwordCheck = validateRegisterForm('test@ mail.com', 'P@ssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Email is invalid.');
  });

  it('should return correct message if email is invalid', () => {
    const passwordCheck = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Email is invalid.');
  });

  it('should return correct message if email start with dot', () => {
    const passwordCheck = validateRegisterForm('.test@mail.com', 'P@ssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Email is invalid.');
  });

  it('should return correct message if email domain start with dot', () => {
    const passwordCheck = validateRegisterForm('test@.mail.com', 'P@ssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Email is invalid.');
  });

  it('should return correct message if email domain has only nimbers', () => {
    const passwordCheck = validateRegisterForm('test@112', 'P@ssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Email is invalid.');
  });

  it(`should return correct message if
    personal info part has double dot`, () => {
    const passwordCheck = validateRegisterForm('te..st@com.ua', 'P@ssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Email is invalid.');
  });



  it('should return correct message if email use forbidden characters', () => {
    const result = [];
    const forbiddenChars = `!$%&'*+/=?^{|}~`;

    forbiddenChars.split('').forEach((char) => {
      result.push(validateRegisterForm(`test${char}@mail.com`, 'P@ssword1'));
    });

    const isAllCorrect = result.some((item) => {
      return item.message !== 'Email is invalid.';
    });

    expect(isAllCorrect).toBe(false);
  });

  it('should return correct message if email and password is invalid', () => {
    const passwordCheck = validateRegisterForm('testmail.com', 'P@ssword');

    expect(passwordCheck.code).toBe(500);
    expect(passwordCheck.message).toBe('Password and email are invalid.');
  });

  it('should return correct message if password is very long', () => {
    const passwordCheck = validateRegisterForm('test@mail.com', 'P@ssssssssssssssssssssssssssssword1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Password is invalid.');
  });

  it('should return correct message if password is too short', () => {
    const passwordCheck = validateRegisterForm('test@mail.com', 'P@d1');

    expect(passwordCheck.code).toBe(422);
    expect(passwordCheck.message).toBe('Password is invalid.');
  });
});
