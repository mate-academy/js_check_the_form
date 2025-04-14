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

  it(`should return error for valid email and password without number`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "P@ssword");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for invalid email and valid passowd`, () => {
    const invalidPassword = validateRegisterForm("tesmail.com", "Pa$1ssword");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Email is invalid.");
  });

  it(`should return error for invalid email and password`, () => {
    const invalidPassword = validateRegisterForm("", "");

    expect(invalidPassword.code).toBe(500);
    expect(invalidPassword.message).toBe("Password and email are invalid.");
  });
});
