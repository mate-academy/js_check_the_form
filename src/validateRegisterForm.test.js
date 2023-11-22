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

  it(`should return error for valid password and invalid email`, () => {
  const invalidEmail = validateRegisterForm('test@com', 'P@ssword1!');

  expect(invalidEmail.code).toBe(422);
  expect(invalidEmail.message).toBe('Email is invalid.');
});

it(`should return error for invalid email and password`, () => {
  const invalidEmailAndPassword = validateRegisterForm('test@com', 'ssword1');

  expect(invalidEmailAndPassword.code).toBe(500);
  expect(invalidEmailAndPassword.message).toBe('Password and email are invalid.');
});

it(`should return error for valid email and password without special character`, () => {
  const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

  expect(invalidPassword.code).toBe(422);
  expect(invalidPassword.message).toBe('Password is invalid.');
});

it(`should return error for valid email and password without uppercase letter`, () => {
  const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword1');

  expect(invalidPassword.code).toBe(422);
  expect(invalidPassword.message).toBe('Password is invalid.');
});

it(`should return error for valid email and password with more than 16 characters`, () => {
  const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword1P@ssword1');

  expect(invalidPassword.code).toBe(422);
  expect(invalidPassword.message).toBe('Password is invalid.');
});
