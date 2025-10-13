'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    const result = validateRegisterForm('P@ssword1!', 'test@mail.com');
    expect(typeof result).toBe('object');
  });

  it(`should return 200 for valid password and email`, () => {
    const valid = validateRegisterForm('P@ssword1!', 'test@mail.com');
    expect(valid.code).toBe(200);
    expect(valid.message).toBe('Email and password are valid.');
  });

  it(`should return 422 for valid email but password missing digit`, () => {
    const invalidPass = validateRegisterForm('P@ssword', 'test@mail.com');
    expect(invalidPass.code).toBe(422);
    expect(invalidPass.message).toBe('Password is invalid.');
  });

  it(`should return 422 for invalid email and valid password`, () => {
    const invalidEmail = validateRegisterForm('P@ssword1!', 'test@com');
    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe('Email is invalid.');
  });

  it(`should return 500 for invalid password and email`, () => {
    const bothInvalid = validateRegisterForm('ssword1', 'test@com');
    expect(bothInvalid.code).toBe(500);
    expect(bothInvalid.message)
      .toBe('Password and email are invalid.');
  });

  it(`should return 422 if password too short`, () => {
    const tooShort = validateRegisterForm('Aa1!', 'valid@mail.com');
    expect(tooShort.code).toBe(422);
    expect(tooShort.message).toBe('Password is invalid.');
  });

  it(`should return 422 if password too long`, () => {
    const tooLong = validateRegisterForm('A1!aaaaaaaaaaaaaaa', 'valid@mail.com');
    expect(tooLong.code).toBe(422);
    expect(tooLong.message).toBe('Password is invalid.');
  });

  it(`should return 422 if email missing '@' symbol`, () => {
    const noAt = validateRegisterForm('P@ssword1!', 'invalidmail.com');
    expect(noAt.code).toBe(422);
    expect(noAt.message).toBe('Email is invalid.');
  });

  it(`should return 422 if email starts with dot`, () => {
    const startDot = validateRegisterForm('P@ssword1!', '.test@mail.com');
    expect(startDot.code).toBe(422);
    expect(startDot.message).toBe('Email is invalid.');
  });

  it(`should return 422 if email has double dots`, () => {
    const doubleDot = validateRegisterForm('P@ssword1!', 'test..mail@mail.com');
    expect(doubleDot.code).toBe(422);
    expect(doubleDot.message).toBe('Email is invalid.');
  });

  it(`should return 422 if top-level domain starts with dot`, () => {
    const tldDot = validateRegisterForm('P@ssword1!', 'test@mail..com');
    expect(tldDot.code).toBe(422);
    expect(tldDot.message).toBe('Email is invalid.');
  });
});

