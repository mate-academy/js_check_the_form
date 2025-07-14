'use strict';

const validateRegisterForm = require('./validateRegisterForm');

describe(`Function 'validateRegisterForm':`, () => {
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
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password
    without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password
    without special character`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'Password1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password
    length less then 8`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssw1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password
    length more then 16`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@ssword1!passwor');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's top level domen starts with dot`, () => {
    const invalidPassword = validateRegisterForm('test@.mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email starts with dot`, () => {
    const invalidPassword = validateRegisterForm('.test@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains double dots`, () => {
    const invalidPassword = validateRegisterForm('te..st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains $`, () => {
    const invalidPassword = validateRegisterForm('te$st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains !`, () => {
    const invalidPassword = validateRegisterForm('te!st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains #`, () => {
    const invalidPassword = validateRegisterForm('te#st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains &`, () => {
    const invalidPassword = validateRegisterForm('te&st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains %`, () => {
    const invalidPassword = validateRegisterForm('te%st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains *`, () => {
    const invalidPassword = validateRegisterForm('te*st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains +`, () => {
    const invalidPassword = validateRegisterForm('te+st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains /`, () => {
    const invalidPassword = validateRegisterForm('te/st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains =`, () => {
    const invalidPassword = validateRegisterForm('te=st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains ^`, () => {
    const invalidPassword = validateRegisterForm('te^st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains ?`, () => {
    const invalidPassword = validateRegisterForm('te?st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains |`, () => {
    const invalidPassword = validateRegisterForm('te|st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains {`, () => {
    const invalidPassword = validateRegisterForm('te{st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains }`, () => {
    const invalidPassword = validateRegisterForm('te}st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains ~`, () => {
    const invalidPassword = validateRegisterForm('te~st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains \``, () => {
    const invalidPassword = validateRegisterForm('te`st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for valid password and
    email's personal_info contains '`, () => {
    const invalidPassword = validateRegisterForm('te\'st@mail.com',
      'P@ssword!1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for invalid password and
    email`, () => {
    const invalidPassword = validateRegisterForm('te@st@mail.com',
      'P@ssword!');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
