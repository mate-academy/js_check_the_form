/* eslint-disable max-len */
'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be defined`, () => {
    expect(validateRegisterForm).toBeDefined();
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe('object');
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('maks@gmail.com', 'ValidP@ssw0rd!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for the invalid email and password`, () => {
    const isValid = validateRegisterForm('testmail.com', 'invalidpassword');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('maks@gmail.com', 'InvalidPassword!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the email with digits and valid password`, () => {
    const isValid = validateRegisterForm('maks12@gmail.com', 'ValidP@ssw0rd!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for email with double dots and valid password`, () => {
    const isValid = validateRegisterForm('maks..@gmail.com', 'ValidP@ssw0rd!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for email with dot on beginning or end of personal info part and valid password`, () => {
    const isValid = validateRegisterForm('.maks@gmail.com', 'ValidP@ssw0rd!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');

    const isValid2 = validateRegisterForm('maks.@gmail.com', 'ValidP@ssw0rd!');

    expect(isValid2.code).toBe(422);
    expect(isValid2.message).toBe('Email is invalid.');
  });

  it(`should return error for email without @ and valid password`, () => {
    const isValid = validateRegisterForm('maksgmail.com', 'ValidP@ssw0rd!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email and password below 8 characters`, () => {
    const isValid = validateRegisterForm('maks@gmail.com', 'Pwd1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password above 16 characters`, () => {
    const isValid = validateRegisterForm('maks@gmail.com', 'ThisIsAVeryLongPassword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password not containing
    at least 1 digit, 1 special character, 1 uppercase letter`, () => {
    const isValid = validateRegisterForm('maks@gmail.com', 'lowercasepassword');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');

    // eslint-disable-next-line max-len
    const isValid2 = validateRegisterForm('maks@gmail.com', 'UppercasePassword');

    expect(isValid2.code).toBe(422);
    expect(isValid2.message).toBe('Password is invalid.');

    const isValid3 = validateRegisterForm('maks@gmail.com', '12345678');

    expect(isValid3.code).toBe(422);
    expect(isValid3.message).toBe('Password is invalid.');
  });

  it(`should return error for email containing characters: ! $ % & ' *
     + / = ? ^ { | } ~ and valid password`, () => {
    const invalidEmails = [
      'ma!ks12@gmail.com',
      'ma$ks12@gmail.com',
      'ma%ks12@gmail.com',
      'ma&ks12@gmail.com',
      "ma'ks12@gmail.com",
      'ma*ks12@gmail.com',
      'ma+ks12@gmail.com',
      'ma/ks12@gmail.com',
      'ma=ks12@gmail.com',
      'ma?ks12@gmail.com',
      'ma^ks12@gmail.com',
      'ma{ks12@gmail.com',
      'ma|ks12@gmail.com',
      'ma~ks12@gmail.com',
    ];

    invalidEmails.forEach(email => {
      const isValid = validateRegisterForm(email, 'ValidP@ssw0rd!');

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });
  });
});
