import { z } from "zod";

export const emailSchema = z
    .string()
    .min(5, "email is too short")
    .max(254, "email is too long")
    .email("invalid email format")
    .refine((val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "email must include a domain (e.g. .com)",
    });

export const usernameSchema = z
    .string()
    .min(3, "username must be at least 3 characters")
    .max(20, "username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed")
    .refine((val: string) => !/^_/.test(val) && !/_$/.test(val), {
        message: "username cannot start or end with underscore",
    });

export const passwordSchemaSignup = z
    .string()
    .min(8, "password must contain at least 8 characters")
    .regex(/[A-Z]/, "must contain an uppercase letter")
    .regex(/[0-9]/, "must contain a number")
    .regex(/[^A-Za-z0-9]/, "must contain a symbol");

export const passwordSchemaLogin = z.string();
