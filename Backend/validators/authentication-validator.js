const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Please enter an email" })
    .trim()
    .email({ message: "Please enter a valid email" })
    .min(3, { message: "email cannot be empty" })
    .max(255, { message: "email cannot exceed 255 characters" }),

  password: z
    .string({ required_error: "Please enter a password" })
    .trim()
    .min(5, { message: "password must be minimum 5 characters" })
    .max(20, { message: "password cannot exceed 20 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Please enter a name" })
    .trim()
    .min(1, { message: "username cannot be empty" })
    .max(20, { message: "username cannot exceed 20 characters" }),

  phone: z
    .string({ required_error: "Please enter a phone number" })
    .trim()
    .min(10, { message: "please enter a valid phone number" })
    .max(10, { message: "phone cannot exceed 10 characters" }),
});

module.exports = { signupSchema, loginSchema };
