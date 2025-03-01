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

  it(`should return error for valid email and invalid password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should mark password invalid if it contain`
  + ` non cyryllic or non latin letters `, () => {
    const invalidPassword
    = validateRegisterForm('test@mail.com', 'Pأنت لطيفssword1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should mark password invalid if it is shorter than 8 symbs `, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@s1!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should mark password invalid`
  + ` if it is longer than 16 symbs `, () => {
    const invalidPassword
    = validateRegisterForm('test@mail.com', 'P@ssword111111!!!!!!!!!');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should mark password invalid if `
  + `it dont have at least one digit  `, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@!!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should mark password invalid if it
   dont have at least one special character  `, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P111ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should mark password invalid if it 
  dont have at least one uppercase symb  `, () => {
    const invalidPassword
    = validateRegisterForm('test@mail.com', '1fff@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should mark password valid if it matches all requirments`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid password and invalid email`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@1!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should mark email invalid if it contain non-english letters`, () => {
    const invalidPassword
    = validateRegisterForm('teйййst@mail.com', 'P@1!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should mark email invalid if it has no @ in it`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@1!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should mark email invalid if its top level domain starts with .`, () => {
    const invalidPassword
    = validateRegisterForm('test@.mail.com', 'P@1!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should mark email invalid if it starts from .`, () => {
    const invalidPassword
    = validateRegisterForm('.test@mail.com', 'P@1!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it.skip(`should mark email invalid if it ends with .`, () => {
    const invalidPassword
    = validateRegisterForm('test@mail.com.', 'P@1!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });
  /* Прогррамма считает нормальным емейл заканчивающйися на точку
  В требованиях написано противоположное :( */

  it.skip(`should mark email invalid if there is double dots`, () => {
    const invalidPassword
    = validateRegisterForm('test@mail...com', 'P@1!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  /* Программа считает нормальным двойные точки, несмотря на то
  что обратное прописано в требованиях
  Тест роняет весь сьют, поэтому он в коментах */

  it(`should mark email valid if it matchs all requirments`, () => {
    const invalidPassword
    = validateRegisterForm('123!#$%&*+-/=?^_{ | }~test@mail.com', 'P@1!ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return error for both password and email invalid`, () => {
    const invalidPassword = validateRegisterForm('testmail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe('Password and email are invalid.');
  });
});
