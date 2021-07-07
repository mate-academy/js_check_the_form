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

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test25@mail.com', 'P@sword1sdf');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test_work@mail.com', 'P@sword1sdf');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for email without dot in domain 
    and valid password`, () => {
    const isValid = validateRegisterForm('testwork@mailcom', 'P@sword1sdf');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email and password without 
  special symbol`, () => {
    const isValid = validateRegisterForm('testwork@mail.com', 'Pswo1asdsd');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error for email with double dots
   and valid password`, () => {
    const isValid = validateRegisterForm('testw:ork@mail.com', 'P@swoas1dsd');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return success message for the valid input
  (password with cyrillic letters)`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'фіві12віфAdf@');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });
});
