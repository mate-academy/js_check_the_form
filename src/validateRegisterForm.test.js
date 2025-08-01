'use strict';

function passwordGenerator(amountOfCharacters, partWithRequiredCharacters) {
  const different = amountOfCharacters - partWithRequiredCharacters.length;

  if (different <= 0) {
    return partWithRequiredCharacters.slice(0, amountOfCharacters);
  }

  const randomLetterASCII = (howManyTimes) => {
    let generatedLetters = '';

    for (let i = 1; i <= howManyTimes; i++) {
      const codeASCII = Math.floor(Math.random() * 26) + 97;

      generatedLetters += String.fromCharCode(codeASCII);
    }

    return generatedLetters;
  };

  const randomPart = randomLetterASCII(amountOfCharacters
    - partWithRequiredCharacters.length);
  const result = partWithRequiredCharacters + randomPart;

  return result;
};

function emailGenerator(personalInfo, domain, topDomain) {
  return `${personalInfo}@${domain}.${topDomain}`;
}

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require('./validateRegisterForm');

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm('test@mail.com', 'P@ssword1!'))
      .toBe('object');
  });

  it(`should return object with 'message' and 'code' parameters`, () => {
    const value = validateRegisterForm('test@mail.com', 'P@ssword1!');
    const dohaveMessageProperty = value.message !== undefined;
    const doHaveCodeProperty = value.code !== undefined;

    expect(dohaveMessageProperty).toBeTruthy();

    expect(doHaveCodeProperty).toBeTruthy();
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm('test@mail.com', 'P@ssword1!');

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe('Email and password are valid.');
  });

  it(`should return error for invalid pasword`, () => {
    const invalidPassword = validateRegisterForm('test@mail.com', 'P@ssword');

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe('Password is invalid.');
  });

  it(`should return error for invalid email`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marÓek32', 'gmail', 'com'), passwordGenerator(10, '6&H')],
      [emailGenerator('marźek32', 'gmail', 'com'), passwordGenerator(10, '6&H')],
      [emailGenerator('marĄek32', 'gmail', 'com'), passwordGenerator(10, '6&H')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });
  });

  it(`should return error for invalid email and invalid password`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marÓek32', 'gmail', 'com'), passwordGenerator(5, '6&H')],
      [emailGenerator('marźek32', 'gmail', 'com'), passwordGenerator(5, '6&H')],
      [emailGenerator('marĄek32', 'gmail', 'com'), passwordGenerator(5, '6&H')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(500);
      expect(isValid.message).toBe('Password and email are invalid.');
    });
  });

  it(`should return success message if `
      + `password consist off Cyrillic letters`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '6&HЯ')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '6&Hя')],
      [emailGenerator('mar.ek32', 'gmail', 'com'), passwordGenerator(10, '6&Hю')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '6&Hж')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe('Email and password are valid.');
    });
  });

  it(`should return error if `
      + `password consist off only 7 characters`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(7, '6&H')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(7, '6&H')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(7, '6&H')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });
  });

  it(`shouldn return error if `
      + `password consist off 17 characters`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(17, '6&H')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(17, '6&H')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(17, '6&H')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });
  });

  it(`shouldn return error if `
      + `password doesn't have any digit`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '&H')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '&H')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '&H')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });
  });

  it(`shouldn return error if `
      + `password doesn't have any special characters`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '5H')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '4H')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '9H')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });
  });

  it(`shouldn return error if `
      + `password doesn't have any upperCase`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '5%')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '4$')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '9@')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });
  });

  it(`shouldn return error if `
      + `at least  one 'password' letter ∉ Latin, Cyrylic`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '5%ć')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '4$ë')],
      [emailGenerator('marek32', 'gmail', 'com'), passwordGenerator(10, '9@æ')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });
  });

  it(`shouldn return error if email consist off `
    + `at least one non-English letter`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marÓek32', 'gmail', 'com'), passwordGenerator(10, '5%A')],
      [emailGenerator('marekë32', 'gmail', 'com'), passwordGenerator(10, '4$B')],
      [emailGenerator('mæarek32', 'gmail', 'com'), passwordGenerator(10, '9@C')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });
  });

  it(`shouldn return error if email consist off `
    + `special character diffrent from [!#$%&'*+-/=?^_\`{|}~]`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('mare¤k32', 'gmail', 'com'), passwordGenerator(10, '5%A')],
      [emailGenerator('maÇrek32', 'gmail', 'com'), passwordGenerator(10, '4$B')],
      [emailGenerator('marek¶32', 'gmail', 'com'), passwordGenerator(10, '9@C')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });
  });

  it(`shouldn return error if email consist off `
    + `double dots, dot at the begining, dot at the end`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('.marek32', 'gmail', 'com'), passwordGenerator(10, '5%A')],
      [emailGenerator('marek32.', 'gmail', 'com'), passwordGenerator(10, '4$B')],
      [emailGenerator('ma..rek32', 'gmail', 'com'), passwordGenerator(10, '9@C')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });
  });

  it(`shouldn return error if email consist off `
    + `top level domain stated with dot`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('marek32', 'gmail', '.es'), passwordGenerator(10, '5%A')],
      [emailGenerator('marek32', 'gmail', '.pl'), passwordGenerator(10, '4$B')],
      [emailGenerator('marek32', 'gmail', '.com'), passwordGenerator(10, '9@C')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });
  });

  it(`shouldn return error if email doesn't consist off `
    + `'@' character`, () => {
    const forms = [
      /* eslint-disable max-len */
      ['marek{32gmail.com', passwordGenerator(10, '5%A')],
      ['koc+i1onet.pl', passwordGenerator(10, '4$B')],
      ['ramBamBam!wp.pl', passwordGenerator(10, '9@C')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });
  });

  it(`shouldn return error if 'email' doesn't included`, () => {
    const forms = [
      /* eslint-disable max-len */
      [undefined, passwordGenerator(10, '5%A')],
      ['', passwordGenerator(10, '5%A')],
      [null, passwordGenerator(10, '5%A')],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Email is invalid.');
    });
  });

  it(`shouldn return error if 'password' doesn't included`, () => {
    const forms = [
      /* eslint-disable max-len */
      [emailGenerator('kociarz32', 'wp', 'com'), ''],
      [emailGenerator('kociarz32', 'wp', 'com'), undefined],
      [emailGenerator('kociarz32', 'wp', 'com'), null],
      /* eslint-enable max-len */
    ];

    forms.forEach((form, i) => {
      const isValid = validateRegisterForm(form[0], form[1]);

      expect(isValid.code).toBe(422);
      expect(isValid.message).toBe('Password is invalid.');
    });
  });
});
