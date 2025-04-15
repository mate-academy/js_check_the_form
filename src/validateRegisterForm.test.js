'use strict';

// const validateEmail = require('../../js_validate_email/src/validateEmail');

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

  // write more tests here

  it(`should return success for valid email,valid pwd w/'Aa-Я' chars`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@1wordфыв');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return error for valid email and pwd <8 chars`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1@swrd');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return success for valid email, valid pwd= 8 chars`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1@sswrd');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success for valid email,valid pwd in 8-16 chars`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P1@ssword');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success for valid email,valid pwd=16 chars`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P1@sssssssssword');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return err for valid email,valid pwd>16 chars`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P1@asssssssssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return err for valid email, pwd w/o min 1 digit`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P@asssssssssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return err for valid email,pwd w/o min 1 capital`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'p1@sssssssssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return err for valid email,pwd w/o min 1 spec`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com',
      'P1sssssssssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return err for email w/non-Latin chard, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('testцвет@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email w/non-Latin chard, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('testцвет@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return success for valid email w/digits, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('test0123456789@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return err for email starting w/dot, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('.test@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] ending'
       w/dot, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('test.@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return success for email's [personal_info] containing'
       dot, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return err for email's [personal_info] containing'
       adjecant dot, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te..st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email w/o @ separator'
       , valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1.st.mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email w/[domain] starting'
       w/dot, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1.st@.mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '!', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1!.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '#', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1#.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '$', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1$.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '%', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1%.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '&', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1&.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '*', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1*.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       ''', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1\'.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '+', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1+.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '/', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1/.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
       '=', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1=.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
      '?', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1?.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
      '^', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1^.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
      '\`', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1`.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
      '{', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1{.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
      '}', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1}.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
      '|', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1|.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return err for email's [personal_info] containing'
      '~', valid pwd`, () => {
    const invalidPassword = validateRegisterForm('te1~.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Email is invalid.');
  });

  it(`should return success for email's [personal_info] containing'
      underscore, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('_te.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });

  it(`should return success for email's [personal_info] containing'
      hyphen, valid pwd`, () => {
    const invalidPassword = validateRegisterForm('_t-e.st@mail.com',
      'P1$ssword');

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe('Email and password are valid.');
  });
  // validate pwd

  //   it(`should return 'false' for the pwd w/non_Latin chars`, () => {
  //     expect(checkPassword('_шщertpwdPWD$8')).toEqual(false);
  //   });

  //   it(`should return 'false' for the pwd w/o min 1 spec char`, () => {
  //     expect(checkPassword('qwertpwdPWD8')).toEqual(false);
  //   });

  //   it(`should return 'false' for the pwd w/o min 1 digit`, () => {
  //     expect(checkPassword('_qwertpwdPWd$')).toEqual(false);
  //   });

  //   it(`should return 'false' for the pwd w/o min 1 capital letter`, () => {
  //     expect(checkPassword('_qwertpwdywD$')).toEqual(false);
  //   });

  //   it(`should return 'true' for the pwd within  8..16 chars`, () => {
  //     expect(checkPassword('_qwertpwdPWD$8')).toEqual(true);
  //   });

  //   it(`should return 'true' for the password = 16 chars`, () => {
  //     expect(checkPassword('_qwertpwdPWD$8fg')).toEqual(true);
  //   });

  //   it(`should return 'false' for the password > 16 chars`, () => {
  //     expect(checkPassword('_qwertpwdPWD$8fg01')).toEqual(false);
  //   });

  // // validate Email

  // it(`should return 'false' for the non-Latin chars [personal_info]`, () => {
  //   expect(validateEmail('цpwd@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '~' is present in [personal_info]`, () => {
  //   expect(validateEmail('1~a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '}' is present in [personal_info]`, () => {
  //   expect(validateEmail('1}a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '{' is present in [personal_info]`, () => {
  //   expect(validateEmail('1{a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '|' is present in [personal_info]`, () => {
  //   expect(validateEmail('1|a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '^' is present in [personal_info]`, () => {
  //   expect(validateEmail('1^a@1.com')).toEqual(false);
  // });

  // it(`should return 'true' char '_' is present in [personal_info]`, () => {
  //   expect(validateEmail('1_a@1.com')).toEqual(true);
  // });

  // it(`should return 'false' char '?' is present in [personal_info]`, () => {
  //   expect(validateEmail('1?a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '!' is present in [personal_info]`, () => {
  //   expect(validateEmail('1!a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '$' is present in [personal_info]`, () => {
  //   expect(validateEmail('1$a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '%' is present in [personal_info]`, () => {
  //   expect(validateEmail('1%a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '&' is present in [personal_info]`, () => {
  //   expect(validateEmail('1&a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '*' is present in [personal_info]`, () => {
  //   expect(validateEmail('1*a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '+' is present in [personal_info]`, () => {
  //   expect(validateEmail('1+a@1.com')).toEqual(false);
  // });

  // it(`should return 'true' char '-' is present in [personal_info]`, () => {
  //   expect(validateEmail('1-a@1.com')).toEqual(true);
  // });

  // it(`should return 'false' char '/' is present in [personal_info]`, () => {
  //   expect(validateEmail('1/a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '=' is present in [personal_info]`, () => {
  //   expect(validateEmail('1=a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' char '\`' is present in [personal_info]`, () => {
  //   expect(validateEmail('1`a@1.com')).toEqual(false);
  // });

  // it(`should return 'false' for [personal_info] starts w/dot`, () => {
  //   expect(validateEmail('.pwd@1.com')).toEqual(false);
  // });

  // it(`should return 'false'if [personal_info] contains 2 adjnt '.'`, () => {
  //   expect(validateEmail('p..wd@1.com')).toEqual(false);
  // });

  // it(`should return 'false'if [personal_info] ends w/'.'`, () => {
  //   expect(validateEmail('pwd.@1.com')).toEqual(false);
  // });

  // it(`should return 'false' if '@' is missing `, () => {
  //   expect(validateEmail('pwd1.com')).toEqual(false);
  // });

  // it(`should return 'false' if [domain] starts w/dot`, () => {
  //   expect(validateEmail('pwd@.1.com')).toEqual(false);
  // });

// it(`should return 'true' if[domain]contains chars,dgts,hyphn,dot`, () => {
  //   expect(validateEmail('pwd@1.paraguay-airforce.mil')).toEqual(true);
  // });
});
