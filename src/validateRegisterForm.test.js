/* eslint-disable max-len */
/* eslint-disable quotes */
"use strict";

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require("./validateRegisterForm");

  it(`should be declared`, () => {
    expect(validateRegisterForm).toBeInstanceOf(Function);
  });

  it(`should return object`, () => {
    expect(typeof validateRegisterForm("test@mail.com", "P@ssword1!")).toBe(
      "object",
    );
  });

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm("test@mail.com", "P@ssword1!");

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe("Email and password are valid.");
  });

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "P@ssword");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for valid email and password with cyrillic letters`, () => {
    const invalidPassword = validateRegisterForm(
      "test@mail.com",
      "Пар@23OS!оль",
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for valid email and password without special character`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "P1ssword");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for valid email and password without uppercase letter`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "@1ssword");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for valid email and password with characters length less than 8`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "Pass5^&");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for valid email and password with characters length more than 16`, () => {
    const invalidPassword = validateRegisterForm(
      "test@mail.com",
      "SuperSecure659*&PassWor$",
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for valid password and email with not eng letters`, () => {
    const invalidEmail = validateRegisterForm("емейл@mail.com", "Pa$$829Da");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error for valid password and email with special symbols before @`, () => {
    const invalidEmail = validateRegisterForm(
      "email!test@mail.com",
      "Pa$$829Da",
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error for valid password and email without @`, () => {
    const invalidEmail = validateRegisterForm(
      "emailtest.mail.com",
      "Pa$$829Da",
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error for valid password and email start with dot "."`, () => {
    const invalidEmail = validateRegisterForm(
      ".emailtest@mail.com",
      "Pa$$829Da",
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error for valid password and email with ":" double dots `, () => {
    const invalidEmail = validateRegisterForm(
      ".email:test@mail.com",
      "Pa$$829Da",
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error for valid password and email with ".." double dots `, () => {
    const invalidEmail = validateRegisterForm(
      ".email..test@mail.com",
      "Pa$$829Da",
    );

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error for valid password and email without domain `, () => {
    const invalidEmail = validateRegisterForm("test@com", "P@ssword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error for invalid email and password `, () => {
    const invalidEmailAndPass = validateRegisterForm("test@com", "ssword1");

    expect(invalidEmailAndPass.code).toBe(500);
    expect(invalidEmailAndPass.message).toBe("Password and email are invalid.");
  });
});
