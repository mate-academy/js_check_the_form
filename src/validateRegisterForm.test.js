'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');
  const validEmail = 'test@gmail.com';
  const validPassword = 'P@ssword1!';

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm(validEmail, validPassword))
      .toBe('object');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm(validEmail, validPassword);

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm(validEmail, 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for too short password', () => {
    const tooShortPass = validateRegisterForm(validEmail, 'P@ss');

    expect(tooShortPass.code).toBe(422);
    expect(tooShortPass.message).toBe('Password is invalid.');
  });

  it('should return error for password with numbers only', () => {
    const invalidPass = validateRegisterForm(validEmail, '12345678');

    expect(invalidPass.code).toBe(422);
    expect(invalidPass.message).toBe('Password is invalid.');
  });

  it('should return error for too long password', () => {
    const tooLongPass
      = validateRegisterForm(validEmail, 'P@ssword1!OfP1anetD3stroy3r999');

    expect(tooLongPass.code).toBe(422);
    expect(tooLongPass.message).toBe('Password is invalid.');
  });

  it('should return error for password without uppercased letter', () => {
    const invalidPass = validateRegisterForm(validEmail, 'p@ssword1!');

    expect(invalidPass.code).toBe(422);
    expect(invalidPass.message).toBe('Password is invalid.');
  });

  it('should return error for email with not english letters', () => {
    const invalidMail
      = validateRegisterForm('сміливийКозак@gmail.com', validPassword);

    expect(invalidMail.code).toBe(422);
    expect(invalidMail.message).toBe('Email is invalid.');
  });

  it('should return error for email starting with dot', () => {
    const invalidMail
      = validateRegisterForm('.test@gmail.com', validPassword);

    expect(invalidMail.code).toBe(422);
    expect(invalidMail.message).toBe('Email is invalid.');
  });

  it('should return error for email with upper domain starting with dot',
    () => {
      const invalidMail
        = validateRegisterForm('test@.gmail.com', validPassword);

      expect(invalidMail.code).toBe(422);
      expect(invalidMail.message).toBe('Email is invalid.');
    }
  );

  it('should return error for email without @', () => {
    const invalidMail
      = validateRegisterForm('testgmail.com', validPassword);

    expect(invalidMail.code).toBe(422);
    expect(invalidMail.message).toBe('Email is invalid.');
  });

  it('should return error for email with double dots', () => {
    const invalidMail
      = validateRegisterForm('test@gmail:.com', validPassword);

    expect(invalidMail.code).toBe(422);
    expect(invalidMail.message).toBe('Email is invalid.');
  });
});
