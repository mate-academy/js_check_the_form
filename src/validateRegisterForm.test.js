'use strict';
/* eslint-disable */

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

  it(`should return successfor the cyrilic in password`, () => {
    const isValid = validateRegisterForm('testmail@mail.com', 'P@sЯяord1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const result = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without special char`, () => {
    const result = validateRegisterForm('test@mail.com', 'Password12');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for password without uppercase`, () => {
    const result = validateRegisterForm('test@mail.com', 'asswor#d12');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password shorter than 8`, () => {
    const result = validateRegisterForm('test@mail.com', 'As#12');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password longer than 16`, () => {
    const result = validateRegisterForm('test@mail.com', 'Passssss#12341233');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Password is invalid.');
  });

  it(`should return error for email with first dot`, () => {
    const result = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email with last dot`, () => {
    const result = validateRegisterForm('test.@mail.com.', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email with two dots one after another`, () => {
    const result = validateRegisterForm('te..st@mail.com.', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email domain started with dot`, () => {
    const result = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email without @`, () => {
    const result = validateRegisterForm('testmail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email without domain`, () => {
    const result = validateRegisterForm('testmail@', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for email without first section`, () => {
    const result = validateRegisterForm('@mail.com', 'P@ssword1!');

    expect(result.code).toBe(422);
    expect(result.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and password`, () => {
    const result = validateRegisterForm('@mail.com', 'P@ssword!');

    expect(result.code).toBe(500);
    expect(result.message).toBe('Password and email are invalid.');
  });
});
