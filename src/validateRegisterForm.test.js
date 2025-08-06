'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  const validEmail = 'test@example.com';
  const validPassword = 'P@ssword1!';

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

  it(`should return error for password without special character`, () => {
    const result = validateRegisterForm(validEmail, 'Passwo0d1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without uppercase letther`, () => {
    const result = validateRegisterForm(validEmail, 'passwo0d1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password shorter than 8 characters`, () => {
    const result = validateRegisterForm(validEmail, 'P@13ss');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password longer than 16 characters`, () => {
    const result = validateRegisterForm(validEmail, 'P@13ssword1234567');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should retur succes for valid password with Cyrillic letthers`, () => {
    const result = validateRegisterForm(validEmail, 'П@fgль1Af');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return error for password that does not meet any requirement`,
    () => {
      const result = validateRegisterForm(validEmail, 'passwor');

      expect(result.code).toBe(422);
      expect(result.message).toBe('Password is invalid.');
    });

  it(`should return error if email does not contain '@'`, () => {
    const result = validateRegisterForm('testexample.com', validPassword);

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error if email starts with a dot`, () => {
    const result = validateRegisterForm('.test@example.com', validPassword);

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error if email ends with a dot`, () => {
    const result = validateRegisterForm('testexample.com.', validPassword);

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error if email contain double dots`, () => {
    const result = validateRegisterForm('.test@example..com', validPassword);

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error if domain starts with a dot (invalid TLD)`, () => {
    const result = validateRegisterForm('test@.com', validPassword);

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it('should accept letters and digits in email', () => {
    const result = validateRegisterForm(
      'john123@example456.com', validPassword);

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return error if email contain invalid character 'space'`, () => {
    const result = validateRegisterForm('te st@example.com', validPassword);

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });
});
