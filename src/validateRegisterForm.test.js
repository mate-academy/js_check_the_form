"use strict";

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require("./validateRegisterForm");

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm("test@mail.com", "P@ssword1!")).toBe(
      "object"
    );
  });

  it(`success message for the valid input`, () => {
    const isValid = validateRegisterForm("test@mail.com", "P@ssword1!");

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe("Email and password are valid.");
  });

  it(`email error for email with no english letters`, () => {
    const isValid = validateRegisterForm("test@maєil.com", "P@ssword1!");

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe("Email is invalid.");
  });

  it(`success message for email with digits and characters`, () => {
    const isValid = validateRegisterForm(
      "Tf4st@m5hgil.co!^&%$5m.cj",
      "P@ssword1!"
    );

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe("Email and password are valid.");
  });

  it(`email error for email without @`, () => {
    const isValid = validateRegisterForm("testmail.com", "P@ssword1!");

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe("Email is invalid.");
  });

  it(`email error for email with . at start`, () => {
    const isValid = validateRegisterForm(".test@mail.com", "P@ssword1!");

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe("Email is invalid.");
  });

  it(`email error for email with double dots`, () => {
    const isValid = validateRegisterForm("te..st@mail.com", "P@ssword1!");

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe("Email is invalid.");
  });

  it(`password error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "P@ssword");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`password error for valid email and password without character`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "Password1");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`password error for valid email and password without uppercase letter.`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "p@assword1");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`invalid password.length > 16`, () => {
    const invalidPassword = validateRegisterForm(
      "test@mail.com",
      "P@sswordhjkkh2###"
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`invalid password.length < 8`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "P@s2###");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`email error for email without dot in domain`, () => {
    const isValid = validateRegisterForm("test@mailcom", "P@ssword1!");

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe("Email is invalid.");
  });

  it(`error message if password and email are invalid`, () => {
    const isValid = validateRegisterForm("test@mailcom", "p@ssword1!");

    expect(isValid.code).toBe(500);
    expect(isValid.message).toBe("Password and email are invalid.");
  });

  it(`email error with dot at the start of top-level domain`, () => {
    const isValid = validateRegisterForm("test@.mail.com", "P@ssword1!");

    expect(isValid.code).toBe(422);
    expect(isValid.message).toBe("Email is invalid.");
  });

  it(`success with an email that ends with a dot `, () => {
    const isValid = validateRegisterForm("test@mail.com.", "P@ssword1!");

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe("Email and password are valid.");
  });

   it(`email error with the local-part(username) ends a dot before @ symbol`, () => {
     const isValid = validateRegisterForm("test.@mail.com.", "P@ssword1!");

     expect(isValid.code).toBe(422);
     expect(isValid.message).toBe("Email is invalid.");
   });

  it(`password with Cyrillic letters`, () => {
    const invalidPassword = validateRegisterForm(
      "test@mail.com",
      "YЖ@sswыэъфйяord1"
    );

    expect(invalidPassword.code).toBe(200);
    expect(invalidPassword.message).toBe("Email and password are valid.");
  });
});
