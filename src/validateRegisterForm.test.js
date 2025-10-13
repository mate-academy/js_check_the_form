'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1!');
    expect(typeof result).toBe('object');
  });

  it(`should return 200 for valid email and password`, () => {
    const valid = validateRegisterForm('test@mail.com', 'P@ssword1!');
    expect(valid.code).toBe(200);
    expect(valid.message).toBe('Email and password are valid.');
  });

  it(`should return 422 for valid email and password missing digit`, () => {
    const invalidPass = validateRegisterForm('test@mail.com', 'P@ssword');
    expect(invalidPass.code).toBe(422);
    expect(invalidPass.message).toBe('Password is invalid.');
  });

  it(`should return 422 for invalid email and valid password`, () => {
    const invalidEmail = validateRegisterForm('test@com', 'P@ssword1!');
    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return 500 for invalid email and password`, () => {
    const bothInvalid = validateRegisterForm('test@com', 'ssword1');
    expect(bothInvalid.code).toBe(500);
    expect(bothInvalid.message)
      .toBe('Password and email are invalid.');
  });

  it(`should return 422 if password too short`, () => {
    const tooShort = validateRegisterForm('valid@mail.com', 'Aa1!');
    expect(tooShort.code).toBe(422);
    expect(tooShort.message).toBe('Password is invalid.');
  });

  it(`should return 422 if password too long`, () => {
    const tooLong = validateRegisterForm(
      'valid@mail.com', 'A1!aaaaaaaaaaaaaaa'
    );
    expect(tooLong.code).toBe(422);
    expect(tooLong.message).toBe('Password is invalid.');
  });

  it(`should return 422 if email missing '@' symbol`, () => {
    const noAt = validateRegisterForm('invalidmail.com', 'P@ssword1!');
    expect(noAt.code).toBe(422);
    expect(noAt.message).toBe('Email is invalid.');
  });

  it(`should return 422 if email starts with dot`, () => {
    const startDot = validateRegisterForm('.test@mail.com', 'P@ssword1!');
    expect(startDot.code).toBe(422);
    expect(startDot.message).toBe('Email is invalid.');
  });

  it(`should return 422 if email has double dots`, () => {
    const doubleDot = validateRegisterForm('test..mail@mail.com', 'P@ssword1!');
    expect(doubleDot.code).toBe(422);
    expect(doubleDot.message).toBe('Email is invalid.');
  });

  it(`should return 422 if top-level domain starts with dot`, () => {
    const tldDot = validateRegisterForm('test@mail..com', 'P@ssword1!');
    expect(tldDot.code).toBe(422);
    expect(tldDot.message).toBe('Email is invalid.');
  });
});
