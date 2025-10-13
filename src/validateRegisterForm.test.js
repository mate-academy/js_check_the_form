'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    const pwd = 'P@ssword1!';
    const email = 'test@mail.com';
    const result = validateRegisterForm(pwd, email);
    expect(typeof result).toBe('object');
  });

  it(`should return 200 for valid password and email`, () => {
    const result = validateRegisterForm('P@ssword1!', 'test@mail.com');
    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`should return 422 for valid email but password missing digit`, () => {
    const result = validateRegisterForm('P@ssword', 'test@mail.com');
    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return 422 for invalid email and valid password`, () => {
    const result = validateRegisterForm('P@ssword1!', 'test@com');
    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return 500 for invalid password and email`, () => {
    const result = validateRegisterForm('ssword1', 'test@com');
    expect(result.code).toBe(500);
    expect(result.message)
      .toBe('Password and email are invalid.');
  });

  it(`should return 422 if password too short`, () => {
    const result = validateRegisterForm('Aa1!', 'valid@mail.com');
    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return 422 if password too long`, () => {
    const longPwd = 'A1!aaaaaaaaaaaaaaa';
    const result = validateRegisterForm(longPwd, 'valid@mail.com');
    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return 422 if email missing '@' symbol`, () => {
    const result = validateRegisterForm('P@ssword1!', 'invalidmail.com');
    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return 422 if email starts with dot`, () => {
    const result = validateRegisterForm('P@ssword1!', '.test@mail.com');
    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return 422 if email has double dots`, () => {
    const result = validateRegisterForm('P@ssword1!', 'test..mail@mail.com');
    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return 422 if top-level domain starts with dot`, () => {
    const result = validateRegisterForm('P@ssword1!', 'test@mail..com');
    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });
});

