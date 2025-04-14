'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');
  const passwords = [
    'Pas1!',
    'Passw1!',
    'Passwo1!',
    'Password123!',
    'Password123456!',
    'Password1234567!',
    'Password12345678!',
    'Password123',
    'password123!',
    'PASSWORD123!',
    'Passwordddd!',
    'Пароль123!',
  ];

  const emails = [
    'testemail@gmail.com',
    'тестимейл@gmail.com',
    'testemai👴l@gmail.com',
    'Testemail@gmail.com',
    'TESTEMAIL@gmail.com',
    'testemail123@gmail.com',
    'test!email@gmail.com',
    'test.email@gmail.com',
    'test..email@gmail.com',
    '.testemail@gmail.com',
    'testemail.@gmail.com',
    'testemail.gmail.com',
    'testemail@@gmail.com',
    'testemail@com',
    'testemail@gmail',
    'testemail@gmail..com',
    'testemail@gmailcom',
  ];

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

  it(`should return error for valid email and password with
  length is less than 8`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[0]);

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password with
  length is on border (7)`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[1]);

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the valid input with
  password length on border (8)`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[2]);

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid input with
  password length between borders (12)`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[3]);

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid input with
  password length is befor border (15)`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[4]);

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid input with
  password length is on border (16)`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[5]);

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and password with
  length is more than border (17)`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[6]);

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password
   without special symbol`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[7]);

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password
  without capital letters`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', passwords[8]);

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // Problems with documentation
  // It should accept passwords without lowercase symbols

  // it(`should return success message for the valid input with
  // password without lowercase letters`, () => {
  //   const invalidPassword
  // = validateRegisterForm('test@mail.com', passwords[9]);

  //   expect(invalidPassword.code).toBe(200);
  //   expect(invalidPassword.message).toBe('Email and password are valid.');
  // });

  it(`should return error for valid email and password
  without numbers`, () => {
    const invalidPassword
    = validateRegisterForm('test@mail.com', passwords[10]);

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // Problems with documentation
  // it should accept passwords with cyrillics

  // it(`should return success message for the valid input with
  // password with cyrillic symbols `, () => {
  //   const invalidPassword
  //   = validateRegisterForm('test@mail.com', passwords[11]);

  //   expect(invalidPassword.code).toBe(200);
  //   expect(invalidPassword.message).toBe('Email and password are valid.');
  // });

  it(`should return error for valid password and
  email name with cyrillic symbols`, () => {
    const invalidPassword = validateRegisterForm(emails[1], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email name with non-acii symbols`, () => {
    const invalidPassword = validateRegisterForm(emails[2], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return success message for the valid input with
  email name with capital letters`, () => {
    const invalidPassword = validateRegisterForm(emails[3], 'P@ssword1!');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid input with
  email name with without lowercase letters`, () => {
    const invalidPassword = validateRegisterForm(emails[4], 'P@ssword1!');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid input with
  email name with numbers`, () => {
    const invalidPassword = validateRegisterForm(emails[5], 'P@ssword1!');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  // Problems with documentation
  // It should accept emails with special symbols

  // it(`should return success message for the valid input with
  // email name with special symbols`, () => {
  //   const invalidPassword = validateRegisterForm(emails[6], 'P@ssword1!');

  //   expect(invalidPassword.code).toBe(200);
  //   expect(invalidPassword.message).toBe('Email and password are valid.');
  // });

  it(`should return success message for the valid input with
  email name with dot`, () => {
    const invalidPassword = validateRegisterForm(emails[7], 'P@ssword1!');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password and
  email name with double dot`, () => {
    const invalidPassword = validateRegisterForm(emails[8], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email name with dot on start`, () => {
    const invalidPassword = validateRegisterForm(emails[9], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email name with dot on end`, () => {
    const invalidPassword = validateRegisterForm(emails[10], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email without at symbol (@)`, () => {
    const invalidPassword = validateRegisterForm(emails[11], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email with double at symbol (@)`, () => {
    const invalidPassword = validateRegisterForm(emails[12], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email without domain`, () => {
    const invalidPassword = validateRegisterForm(emails[13], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
  email without top-domain`, () => {
    const invalidPassword = validateRegisterForm(emails[14], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  // Problems with documentation
  // It shouldn't accept emails with double dot in domain

  // it(`should return error for valid password and
  // email domain with double dot`, () => {
  //   const invalidPassword = validateRegisterForm(emails[15], 'P@ssword1!');

  //   expect(invalidPassword.code).toBe(422);
  //   expect(invalidPassword.message).toBe('Email is invalid.');
  // });

  it(`should return error for valid password and
  email domain without dot`, () => {
    const invalidPassword = validateRegisterForm(emails[16], 'P@ssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid email and password`, () => {
    const invalidPassword = validateRegisterForm(emails[10], passwords[6]);

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
