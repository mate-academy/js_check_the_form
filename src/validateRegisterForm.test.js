"use strict";

describe(`Function 'validateRegisterForm':`, () => {
  const validateRegisterForm = require("./validateRegisterForm");

  describe("General function behavior", () => {
    it(`should be declared`, () => {
      expect(validateRegisterForm).toBeInstanceOf(Function);
    });

    it(`should return object`, () => {
      expect(typeof validateRegisterForm("test@mail.com", "P@ssword1!")).toBe(
        "object"
      );
    });
  });

  describe("Valid cases", () => {
    it(`should return success message for the valid input`, () => {
      const isValid = validateRegisterForm("test@mail.com", "P@ssword1!");

      expect(isValid.code).toBe(200);
      expect(isValid.message).toBe("Email and password are valid.");
    });

    it(`should return a success message for valid password and email with digits`, () => {
      const invalidPassword = validateRegisterForm(
        "test123@gmail.com",
        "P@ssword1"
      );

      expect(invalidPassword.code).toBe(200);
      expect(invalidPassword.message).toBe("Email and password are valid.");
    });
  });

  describe("Invalid password cases", () => {
    it(`should return error for valid email and password without number`, () => {
      const invalidPassword = validateRegisterForm("test@mail.com", "P@ssword");

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Password is invalid.");
    });
    it(`should return error for valid email and password with less than 8 characters`, () => {
      const invalidPassword = validateRegisterForm("test@mail.com", "P@sswd1");

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Password is invalid.");
    });
    it(`should return error for valid email and password with more than 16 characters`, () => {
      const invalidPassword = validateRegisterForm(
        "test@mail.com",
        "P@ssword1password"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Password is invalid.");
    });
    it(`should return error for valid email and password with at least 1 digit, 1 special character, but no uppercase letters`, () => {
      const invalidPassword = validateRegisterForm(
        "test@mail.com",
        "p@ssword1"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Password is invalid.");
    });
    it(`should return error for valid email and password with at least 1 digit, 1 uppercase letter, but no special characters`, () => {
      const invalidPassword = validateRegisterForm(
        "test@mail.com",
        "Password1"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Password is invalid.");
    });
  });

  describe("Invalid email cases", () => {
    it("should return an error if email starts with a dot", () => {});
  });

  describe("Invalid email and password cases", () => {
    it(`should return error for valid password and email with no English letters (Aa-Zz)`, () => {
      const invalidPassword = validateRegisterForm(
        "тестлап838@gmail.com",
        "P@ssword1"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Email is invalid.");
    });
    it(`should return error for valid password and email which domain starts with a dot`, () => {
      const invalidPassword = validateRegisterForm(
        "test.@gmail.com",
        "P@ssword1"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Email is invalid.");
    });
    it(`should return error for valid password and email which starts with a dot`, () => {
      const invalidPassword = validateRegisterForm(
        ".test@gmail.com",
        "P@ssword1"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Email is invalid.");
    });
    it(`should return error for valid password and email with no @`, () => {
      const invalidPassword = validateRegisterForm(
        "testgmail.com",
        "P@ssword1"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Email is invalid.");
    });
    it(`should return error for valid password and email with :`, () => {
      const invalidPassword = validateRegisterForm(
        "t:est@g:mail.com",
        "P@ssword1"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Email is invalid.");
    });
    it(`should return an error for valid password and email with any of '! # $ % & ' * + - / = ? ^ _  { | } ~'`, () => {
      const invalidPassword = validateRegisterForm(
        "tes$%#!t@gmail.com",
        "P@ssword1"
      );

      expect(invalidPassword.code).toBe(422);
      expect(invalidPassword.message).toBe("Email is invalid.");
    });
  });
});
