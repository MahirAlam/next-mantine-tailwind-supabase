import { z } from "zod";

export const userSignInFormValidator = z
  .object({
    email: z.string().email("this is not an mail address"),
    password: z
      .string()
      .min(8, "password should have at least 8 characters")
      .max(32, "password shouldn't be larger then 32 characters"),
    conformPassword: z.string(),
    terms: z.boolean(),
  })
  .refine(({ password }) => /[0-9]/.test(password), {
    message: "At least include one Number",
    path: ["password"],
  })
  .refine(({ password }) => /[a-z]/.test(password), {
    message: "At least include one lowercase english character",
    path: ["password"],
  })
  .refine(({ password }) => /[A-Z]/.test(password), {
    message: "At least include one uppercase english character",
    path: ["password"],
  })
  .refine(({ password, conformPassword }) => conformPassword === password, {
    message: "password and conform password should match",
    path: ["conformPassword"],
  })
  .refine(({ terms }) => terms, {
    message: "Please accept our conditions",
    path: ["terms"],
  });

export const userLoginFormValidator = z.object({
  email: z.string().email("this is not an mail address"),
  password: z
    .string()
    .min(8, "password should have at least 8 characters")
    .max(32, "password shouldn't be larger then 32 characters"),
  // terms: z.boolean(),
});
// .refine(({ terms }) => terms, {
//   message: "Please accept our conditions",
//   path: ["terms"],
// });
