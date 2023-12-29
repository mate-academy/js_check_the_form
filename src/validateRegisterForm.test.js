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

it('should input the valid password, which includes at least 8 characters', () => {
  const validPassword = validateRegisterForm('123olesia');
  expect(validPassword.code).to.be.equal(200);
  expect(validPassword.message).to.be.equal('Password is valid.');
  });

  it(`should return error for password, which includes at least 7 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Pass1@1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for password, which includes at least 17 characters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password12vgdgvdfg@');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it('should return error for both invalid email and password format', () => {
    const invalidData = validateRegisterForm('invalid.email@com', 'InvalidPassword');

    expect(invalidData.code).to.be.equal(500);
    expect(invalidData.message).to.be.equal('Email and password are invalid.');
  });

  
  it(`should return error for the email, which starts with dot .`, () => {
    const invalidEmail = validateRegisterForm('.invalidemail@gmail.com', 'ValidP@ss123');

    expect(invalidEmail.code).to.be.equal(422);
    expect(invalidEmail.message).to.be.equal('Email is invalid.');
  });

  it(`should input the valid password with letters Aa-Zz, Aa-Яя`, () => {
    const isValid = validateRegisterForm('Test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it('should return error for invalid email format', () => {
    const invalidEmail = validateRegisterForm('invalid.email@com', 'ValidP@ss123');

    expect(invalidEmail.code).to.be.equal(422);
    expect(invalidEmail.message).to.be.equal('Email is invalid.');
  });

  it('should return error for empty email and password', () => {
    const emptyData = validateRegisterForm('', '');

    expect(emptyData.code).to.be.equal(500);
    expect(emptyData.message).to.be.equal('Email and password are invalid.');
  });

});
