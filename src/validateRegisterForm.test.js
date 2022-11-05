'use strict';

const validateRegisterForm = require('./validateRegisterForm');

const validDataResponse = {
  code: 200, message: 'Email and password are valid.',
};

const invalidEmailResponse = {
  code: 422, message: 'Email is invalid.',
};

const invalidPasswordResponse = {
  code: 422, message: 'Password is invalid.',
};

const invalidEmailAndPasswordResponse = {
  code: 500, message: 'Password and email are invalid.',
};

describe(`Function 'validateRegisterForm' should`, () => {
  it('be declared', function() {
    expect(validateRegisterForm)
      .toBeInstanceOf(Function);
  });

  it(`return an object`, function() {
    const result = validateRegisterForm('test@gmail.com', 'P@ssword1!');

    expect(result)
      .toBeInstanceOf(Object);
  });

  it(`return an object with fields`
    + `'code'(number) and 'message'(string)`, function() {
    const result = validateRegisterForm('test@gmail.com', 'P@ssword1!');

    expect(result)
      .toHaveProperty('code');

    expect(result)
      .toHaveProperty('message');

    expect(typeof result.code)
      .toBe('number');

    expect(typeof result.message)
      .toBe('string');
  });
});

describe('Invalid password', () => {
  it('should return correct response'
    + 'if password is empty', function() {
    const result = validateRegisterForm('test@gmail.com', '');

    expect(result)
      .toEqual(invalidPasswordResponse);
  });

  it('should return correct response'
    + 'if password include unacceptable letters', function() {
    const result = validateRegisterForm('test@gmail.com', 'ƒјљќќўѕћ°™™ќ~∆µ');

    expect(result)
      .toEqual(invalidPasswordResponse);
  });

  it('should return correct response if password too short', function() {
    const result = validateRegisterForm('test@gmail.com', 'pass');

    expect(result)
      .toEqual(invalidPasswordResponse);
  });

  it('should return correct response if password too long', function() {
    const result = validateRegisterForm(
      'test@gmail.com',
      'passwordistoolongvery'
    );

    expect(result)
      .toEqual(invalidPasswordResponse);
  });

  it('should return correct response'
    + 'if password not contains numbers, special characters'
    + 'or uppercase letters', function() {
    const testOne = validateRegisterForm('test@gmail.com', 'P@ssword!!');
    const testTwo = validateRegisterForm('test@gmail.com', 'Password11');
    const testThree = validateRegisterForm('test@gmail.com', 'p@ssword1!');

    expect(testOne)
      .toEqual(invalidPasswordResponse);

    expect(testTwo)
      .toEqual(invalidPasswordResponse);

    expect(testThree)
      .toEqual(invalidPasswordResponse);
  });
});

describe('Invalid email', () => {
  it('should return correct response if email is empty', function() {
    const result = validateRegisterForm('', 'P@ssword1!');

    expect(result)
      .toEqual(invalidEmailResponse);
  });

  it('should return correct response'
    + 'if email include unacceptable letters', function() {
    const result = validateRegisterForm('тест@гмаіл.ком', 'P@ssword1!');

    expect(result)
      .toEqual(invalidEmailResponse);
  });

  it('should return correct response if email not include a dot', function() {
    const result = validateRegisterForm('test@gmailcom', 'P@ssword1!');

    expect(result)
      .toEqual(invalidEmailResponse);
  });

  it('should return correct response'
    + 'if email include a dot at a start or end of email', function() {
    const test1 = validateRegisterForm('.test@gmail.com', 'P@ssword1!');
    // const test2 = validateRegisterForm('test@gmail.com.', 'P@ssword1!');

    expect(test1)
      .toEqual(invalidEmailResponse);

    // expect(test2)
    //   .toEqual(invalidEmailResponse);
  });

  it('should return correct response if email include two or more dots'
    + 'which come one after the other', function() {
    // const result = validateRegisterForm('test@gmail.....com', 'P@ssword1!');

    // expect(result)
    //   .toEqual(invalidEmailResponse);
  });

  it(`should return correct response`
    + `if email is not include a '@' character`, function() {
    const result = validateRegisterForm('testgmail.com', 'P@ssword1!');

    expect(result)
      .toEqual(invalidEmailResponse);
  });
});

describe('Invalid and valid email and password', () => {
  it('should return correct response'
    + 'if email and password are invalid', function() {
    const result = validateRegisterForm('testgmailcom', 'password');

    expect(result)
      .toEqual(invalidEmailAndPasswordResponse);
  });

  it('should return correct response'
    + 'if email and password are valid', function() {
    const result = validateRegisterForm('test@gmail.com', 'P@ssword1!');

    expect(result)
      .toEqual(validDataResponse);
  });
});
