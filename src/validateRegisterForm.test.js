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

  it(`success message for the valid input`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword1!Абс');

    expect(result.code).toBe(200);
    expect(result.message).toBe('Email and password are valid.');
  });

  it(`error for valid email and password missing digit`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`error for valid email and password missing special char`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`error for valid email and password missing uppercase letter`, () => {
    const result = validateRegisterForm('test@mail.com', 'password!1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`error for valid email and password length < 8`, () => {
    const result = validateRegisterForm('test@mail.com', 'Test!1');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`error for valid email and password length > 16`, () => {
    const result = validateRegisterForm(
      'test@mail.com', 'TestPassword!123456789'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`error for empty password`, () => {
    const result = validateRegisterForm('test@mail.com', '');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`error for empty email`, () => {
    const result = validateRegisterForm(
      '', 'Password!1'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`error for email missing english letters`, () => {
    const result = validateRegisterForm(
      'тест@mail.com', 'Password!1'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`error for email missing @`, () => {
    const result = validateRegisterForm(
      'testmail.com', 'Password!1'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`error for email if top level domain start with dot`, () => {
    const result = validateRegisterForm(
      'test@.mail.com', 'Password!1'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`error for email if email start with dot`, () => {
    const result = validateRegisterForm(
      '.test@mail.com', 'Password!1'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`error for email if email has double dots`, () => {
    const result = validateRegisterForm(
      'te..st@mail.com', 'Password!1'
    );

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`error for not valid email and password`, () => {
    const result = validateRegisterForm(
      'te..st@mail.com', 'Password'
    );

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });
});
