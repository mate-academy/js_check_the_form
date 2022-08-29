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

  it(`should return success message for the valid password and email with number`, () => {
    const isValid = validateRegisterForm('test123@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid password and email with '_'`, () => {
    const isValid = validateRegisterForm(`test_@mail.com`, 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return success message for the valid password and email with
  a dot, if email doest start or ends or doent have two dots in the row`, () => {
    const isValid = validateRegisterForm(`test.tetovich@mail.com`, 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

//  ! # $ % & ' * + - / = ? ^ _ ` { | } ~
  // Negative password scenario:
  it(`should return error for valid email and shorter than 8 chars password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ss12');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and longer than 16 chars password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswordP@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
  
  it(`should return error for valid email and longer than 16 chars password`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@sswordP@ssword1');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for valid email and password without a number`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
  
  it(`should return error for valid email and password without a special`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P2ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });
  
  it(`should return error for valid email and password without a capital letter`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'p2ssword123');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  // Negative email scenario:
  it(`should return error for the valid password and email with cyrylic`, () => {
    const isValid = validateRegisterForm('тест@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });
    
  it(`should return error for the valid password and email with two dots in the row`, () => {
    const isValid = validateRegisterForm('test..testovich@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });
   
  it(`should return error for the valid password and email that starts with dot`, () => {
    const isValid = validateRegisterForm('.test.testovich@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });
   
  it(`should return error for the valid password and email that end with dot`, () => {
    const isValid = validateRegisterForm('test.testovich.@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for the valid password and email without '@' symbol`, () => {
    const isValid = validateRegisterForm('test.mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for the valid password and email
    witch name ends with dot`, () => {
    const isValid = validateRegisterForm('test.@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for the valid password and email
    witch domain starts with dot`, () => {
    const isValid = validateRegisterForm('test@.mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  it(`should return error for the valid password and email
    witch starts with dot`, () => {
    const isValid = validateRegisterForm('.test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  
  it(`should return error for the valid password and email
    witch has two dots in row`, () => {
    const isValid = validateRegisterForm('te..st@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe('Email is invalid.');
  });

  // Both negaive scenario:
  it(`should return 500 code with error for the invalid password and invalid email`, () => {
    const isValid = validateRegisterForm('te..st@mail.com', 'p@ssword1');

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe('Password and email are invalid.');
  });

});
