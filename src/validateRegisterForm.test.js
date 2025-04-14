'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be defined`, () => {
    expect(validateRegisterForm).toBeDefined();
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!')).toBe(
      'object'
    );
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error message for the invalid email and password`, () => {
    const isValid = validateRegisterForm('testmail.com', 'sam1#asdfgh');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success message for the email with digits
    and valid password`, () => {
    const isValid = validateRegisterForm('monkey12@gm.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for email with double dots
    and valid password`, () => {
    const isValid = validateRegisterForm('monkey..@gm.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for email with dot on begining or end of
    personal info part and valid password`, () => {
    const isValid = validateRegisterForm('.monkey@gm.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');

    const isValid2 = validateRegisterForm('monkey.@gm.com', 'P@ssword1!');

    expect(isValid2.code).toBe(422);
    expect(isValid2.message).toBe('Email is invalid.');
  });

  it(`should return error for email without @  and valid password`, () => {
    const isValid = validateRegisterForm('monkeygm.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for valid email
     and password bellow 8 characters`, () => {
    const isValid = validateRegisterForm('monkey@gm.com', 'sam1@Za');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password above 16 characters`, () => {
    const isValid = validateRegisterForm('monkey@gm.com', 'sam1@Zqwertyuiopa');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email
    and password not containing at least
     1 digit, 1 special character, 1 uppercase letter`, () => {
    const isValid = validateRegisterForm('monkey@gm.com', 'sam1#asdfgh');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Password is invalid.');

    const isValid2 = validateRegisterForm('monkey@gm.com', 'samAs#dfghj');

    expect(isValid2.code).toBe(422);
    expect(isValid2.message).toBe('Password is invalid.');

    const isValid3 = validateRegisterForm('monkey@gm.com', 'samA123asdf');

    expect(isValid3.code).toBe(422);
    expect(isValid3.message).toBe('Password is invalid.');
  });

  it(`should return error for email containing
    characters: ! $ % & ' * + / = ? ^ { | } ~ and valid password`, () => {
    const isValid1 = validateRegisterForm('mon!key12@gm.com', 'P@ssword1!');

    expect(isValid1.code).toBe(422);
    expect(isValid1.message).toBe('Email is invalid.');

    const isValid2 = validateRegisterForm('mon$key12@gm.com', 'P@ssword1!');

    expect(isValid2.code).toBe(422);
    expect(isValid2.message).toBe('Email is invalid.');

    const isValid3 = validateRegisterForm('mon%key12@gm.com', 'P@ssword1!');

    expect(isValid3.code).toBe(422);
    expect(isValid3.message).toBe('Email is invalid.');

    const isValid4 = validateRegisterForm('mon&key12@gm.com', 'P@ssword1!');

    expect(isValid4.code).toBe(422);
    expect(isValid4.message).toBe('Email is invalid.');

    const isValid5 = validateRegisterForm("mon'key12@gm.com", 'P@ssword1!');

    expect(isValid5.code).toBe(422);
    expect(isValid5.message).toBe('Email is invalid.');

    const isValid6 = validateRegisterForm('mon*key12@gm.com', 'P@ssword1!');

    expect(isValid6.code).toBe(422);
    expect(isValid6.message).toBe('Email is invalid.');

    const isValid7 = validateRegisterForm('mon+key12@gm.com', 'P@ssword1!');

    expect(isValid7.code).toBe(422);
    expect(isValid7.message).toBe('Email is invalid.');

    const isValid8 = validateRegisterForm('mon/key12@gm.com', 'P@ssword1!');

    expect(isValid8.code).toBe(422);
    expect(isValid8.message).toBe('Email is invalid.');

    const isValid9 = validateRegisterForm('tmon=key12@gm.com', 'P@ssword1!');

    expect(isValid9.code).toBe(422);
    expect(isValid9.message).toBe('Email is invalid.');

    const isValid10 = validateRegisterForm('mon?key12@gm.com', 'P@ssword1!');

    expect(isValid10.code).toBe(422);
    expect(isValid10.message).toBe('Email is invalid.');

    const isValid11 = validateRegisterForm('mon^key12@gm.com', 'P@ssword1!');

    expect(isValid11.code).toBe(422);
    expect(isValid11.message).toBe('Email is invalid.');

    const isValid12 = validateRegisterForm('mon{key12@gm.com', 'P@ssword1!');

    expect(isValid12.code).toBe(422);
    expect(isValid12.message).toBe('Email is invalid.');

    const isValid13 = validateRegisterForm('mon^key12@gm.com', 'P@ssword1!');

    expect(isValid13.code).toBe(422);
    expect(isValid13.message).toBe('Email is invalid.');

    const isValid14 = validateRegisterForm('mon|key12@gm.com', 'P@ssword1!');

    expect(isValid14.code).toBe(422);
    expect(isValid14.message).toBe('Email is invalid.');

    const isValid15 = validateRegisterForm('mon~key12@gm.com', 'P@ssword1!');

    expect(isValid15.code).toBe(422);
    expect(isValid15.message).toBe('Email is invalid.');
  });
});
