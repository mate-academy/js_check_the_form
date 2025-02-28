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

  it(`should return success message for the valid input`, () => {
    const isValid = validateRegisterForm("test@mail.com", "P@ssword1!");

    expect(isValid.code).toBe(200);
    expect(isValid.message).toBe("Email and password are valid.");
  });

  it(`should return error for valid password without number`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "P@ssword");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return an error for a password too short (<8)`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "P@srd1");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return an error for a password too long (>16)`, () => {
    const invalidPassword = validateRegisterForm(
      "test@mail.com",
      "P@ssrd1qasdfert!f"
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error no special characters in password`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "Password");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error no uppercase letters in password`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "password!1");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return an error if the email is missing the '@' `, () => {
    const invalidEmail = validateRegisterForm("testmail.com", "P@ssword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error if starts with a period`, () => {
    const invalidEmail = validateRegisterForm(".test@mail.com", "P@ssword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error if end with a period`, () => {
    const invalidEmail = validateRegisterForm("test.@mail.com", "P@ssword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error if end with double dots`, () => {
    const invalidEmail = validateRegisterForm("test..@mail.com", "P@ssword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error for valid email and password not correct`, () => {
    const invalidEmail = validateRegisterForm("test@com", "ssword1");

    expect(invalidEmail.code).toBe(500);
    expect(invalidEmail.message).toBe("Password and email are invalid.");
  });
});
