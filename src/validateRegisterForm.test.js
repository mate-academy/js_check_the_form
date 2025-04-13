'use strict';

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  const getReturnValue = (code, message) => ({
    code, message,
  });

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return success message for valid email and password`, () => {
    const returnValue = getReturnValue(200, 'Email and password are valid.');

    expect(validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('user123@mail.com', 'MeAw@som2P0ss!'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('stm@test.ua!!!', 'P@ssword1!'))
      .toStrictEqual(returnValue);
  });

  it(`should return error for valid email and invalid password`, () => {
    const returnValue = getReturnValue(422, 'Password is invalid.');

    expect(validateRegisterForm('test@mail.com', 'P@ssword'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('asura@scans.uk.1222$$$$', 'Password'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('animal@control.pu', '123@@@p'))
      .toStrictEqual(returnValue);
  });

  it(`should return error for valid password and invalid email`, () => {
    const returnValue = getReturnValue(422, 'Email is invalid.');

    expect(validateRegisterForm('test!mail.com', 'P@ssword1'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('111!!sasd@mail.com', 'S0m!P@ss123'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('connings@burg!.com', 'P@ssw))rd1'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('.non@binary!.com.', 'P@wed12da'))
      .toStrictEqual(returnValue);
  });

  it(`should return error for invalid password and invalid email`, () => {
    const returnValue = getReturnValue(500, 'Password and email are invalid.');

    expect(validateRegisterForm('test.mail.com', 'P@ssword'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('1223@.com', 'P221asd'))
      .toStrictEqual(returnValue);

    expect(validateRegisterForm('2.1.@.c', 'cccc'))
      .toStrictEqual(returnValue);
  });

  it('should throw an error if input is not a string', () => {
    expect(() => validateRegisterForm(undefined)).toThrow();
    expect(() => validateRegisterForm()).toThrow();
    expect(() => validateRegisterForm(123, null)).toThrow();
    expect(() => validateRegisterForm(false, true)).toThrow();
    expect(() => validateRegisterForm(NaN, true)).toThrow();
    expect(() => validateRegisterForm({}, [])).toThrow();
  });
});
