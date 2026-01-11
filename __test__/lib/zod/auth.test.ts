import {
  LOGIN_SCHEMA,
  SIGNUP_SCHEMA,
  RESET_PASSWORD_SCHEMA,
} from "@/lib/zod/auth";
import { zodFlattenError } from "@/lib/zod/utils";

describe("LOGIN_SCHEMA", () => {
  it("should validate correct login credentials", () => {
    const validUser = {
      email: "valid-email@gmail.com",
      signin_password: "123456789",
    };

    const result = LOGIN_SCHEMA.safeParse(validUser);

    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const invalidUserEmail = {
      email: "invalid-email",
      signin_password: "123456789",
    };

    const result = LOGIN_SCHEMA.safeParse(invalidUserEmail);
    const flattedErrors = zodFlattenError(result.error!);
    const emailErrMsg = flattedErrors.fieldErrors.email?.[0];

    expect(result.success).toBe(false);
    expect(emailErrMsg).toStrictEqual("Invalid email format");
  });

  it("should reject empty password", () => {
    const invalidUserPassword = {
      email: "valid-email@gmail.com",
      signin_password: "",
    };

    const result = LOGIN_SCHEMA.safeParse(invalidUserPassword);
    const flattedErrors = zodFlattenError(result.error!);
    const passwordErrMsg = flattedErrors.fieldErrors.signin_password?.[0];

    expect(result.success).toBe(false);
    expect(passwordErrMsg).toStrictEqual("Password is required");
  });
});

describe("SIGNUP_SCHEMA", () => {
  it("should validate correct signup data", () => {
    const validSignupUser = {
      name: "valid-user",
      email: "valid-email@gmail.com",
      signup_password: "123456789",
    };

    const result = SIGNUP_SCHEMA.safeParse(validSignupUser);
    expect(result.success).toBe(true);
  });

  it("should reject invalid name (too short)", () => {
    const invalidSignupUser = {
      name: "A",
      email: "valid-email@gmail.com",
      signup_password: "123456789",
    };

    const result = SIGNUP_SCHEMA.safeParse(invalidSignupUser);

    expect(result.success).toBe(false);

    const flattedErrors = zodFlattenError(result.error!);
    const nameErrMsg = flattedErrors.fieldErrors.name?.[0];

    expect(result.success).toBe(false);
    expect(nameErrMsg).toStrictEqual("Name must be at least 2 characters");
  });

  it("should reject weak password (less than 8 chars)", () => {
    const invalidSignupUser = {
      name: "valid-user",
      email: "valid-email@gmail.com",
      signup_password: "123456",
    };

    const result = SIGNUP_SCHEMA.safeParse(invalidSignupUser);

    expect(result.success).toBe(false);

    const flattedErrors = zodFlattenError(result.error!);
    const passwordErrMsg = flattedErrors.fieldErrors.signup_password?.[0];

    expect(result.success).toBe(false);
    expect(passwordErrMsg).toStrictEqual(
      "Password must be at least 8 characters",
    );
  });
});

describe("RESET_PASSWORD_SCHEMA", () => {
  it("should validate matching passwords", () => {
    const validRestPassword = {
      password: "123456789",
      confirmPassword: "123456789",
    };

    const result = RESET_PASSWORD_SCHEMA.safeParse(validRestPassword);
    expect(result.success).toBe(true);
  });

  it("should reject mismatched passwords", () => {
    const invalidRestPassword = {
      password: "123456789",
      confirmPassword: "12345678",
    };

    const result = RESET_PASSWORD_SCHEMA.safeParse(invalidRestPassword);

    const flattedErrors = zodFlattenError(result.error!);
    const passwordErrMsg = flattedErrors.fieldErrors.confirmPassword?.[0];

    expect(result.success).toBe(false);
    expect(passwordErrMsg).toStrictEqual("Passwords do not match");
  });

  it("should reject password shorter than 8 characters", () => {
    const invalidRestPassword = {
      password: "12345",
      confirmPassword: "123456789",
    };

    const result = RESET_PASSWORD_SCHEMA.safeParse(invalidRestPassword);

    const flattedErrors = zodFlattenError(result.error!);
    const passwordErrMsg = flattedErrors.fieldErrors.password?.[0];

    expect(result.success).toBe(false);
    expect(passwordErrMsg).toStrictEqual(
      "Password must be at least 8 characters",
    );
  });
});
