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

  it(`should return error for valid password and email without @`, () => {
    const invalidEmailMask = validateRegisterForm('testmail.com', 'P@ssword1');

    expect(invalidEmailMask.code).toBe(422);
    expect(invalidEmailMask.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidEmailMaskAndPassword = validateRegisterForm(
      'testmail.com', 'P@ssword');

    expect(invalidEmailMaskAndPassword.code).toBe(500);

    expect(invalidEmailMaskAndPassword.message)
      .toBe('Password and email are invalid.');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test1@mail.com', 'P@ssword1!123456');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid input`, () => {
    const invalidPassword = validateRegisterForm('te_st@mail.com', 'P@sd1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the valid input`, () => {
    const invalidPassword = validateRegisterForm(
      'te.st@mail.com', 'P@ssword1!12345678');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the valid input`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.lom.com', 'p@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the valid input`, () => {
    const invalidPassword = validateRegisterForm(
      'test@mail.lo_m.com', 'P@ssword!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidEmailMask = validateRegisterForm(
      '.test@mail.com', 'P@ssword1');

    expect(invalidEmailMask.code).toBe(422);
    expect(invalidEmailMask.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidEmailMask = validateRegisterForm(
      'te..st@mail.com', 'P@ssword1');

    expect(invalidEmailMask.code).toBe(422);
    expect(invalidEmailMask.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidEmailMask = validateRegisterForm(
      'test@.mail.com', 'P@ssword1');

    expect(invalidEmailMask.code).toBe(422);
    expect(invalidEmailMask.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidEmailMask = validateRegisterForm(
      'te:st@mail.com', 'P@ssword1');

    expect(invalidEmailMask.code).toBe(422);
    expect(invalidEmailMask.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidEmailMask = validateRegisterForm(
      'test@ma:il.com', 'P@ssword1');

    expect(invalidEmailMask.code).toBe(422);
    expect(invalidEmailMask.message).toBe('Email is invalid.');
  });
});
