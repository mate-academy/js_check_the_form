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

  it(`should return error for valid email and password without symbol`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "Password1");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for password without capital letter`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "p@ssword1");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for password length < 8`, () => {
    const invalidPassword = validateRegisterForm("test@mail.com", "P@ssw1");

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for password length > 16`, () => {
    const invalidPassword = validateRegisterForm(
      "test@mail.ru",
      "P@sssword1verylength"
    );

    expect(invalidPassword.code).toBe(422);
    expect(invalidPassword.message).toBe("Password is invalid.");
  });

  it(`should return error for email with not only English letters`, () => {
    const invalidEmail = validateRegisterForm("тест@mail.com", "P@ssword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error message if dote is in start or the end`, () => {
    const invalidEmail = validateRegisterForm(".test@mail.com", "P@assword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error message if email without @`, () => {
    const invalidEmail = validateRegisterForm("test.mail.com", "P@sssword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error message if email with :`, () => {
    const invalidEmail = validateRegisterForm("te:st@mail.com", "P@ssword1");

    expect(invalidEmail.code).toBe(422);
    expect(invalidEmail.message).toBe("Email is invalid.");
  });

  it(`should return error message if email and password are invalid`, () => {
    const invalidEmailAndPassword = validateRegisterForm(
      "t:est@mail.com",
      "passwroddflksflksffsd"
    );

    expect(invalidEmailAndPassword.code).toBe(500);

    expect(invalidEmailAndPassword.message).toBe(
      "Password and email are invalid."
    );
  });
});
