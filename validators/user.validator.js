import Joi from "joi";

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/;

export const createUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string()
    .pattern(passwordRegex)
    .message("Password must be 6-30 chars and contain valid characters")
    .required(),

  role: Joi.string().valid("viewer", "analyst", "admin").optional(),

  status: Joi.string().valid("active", "inactive").optional(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid("viewer", "analyst", "admin"),
  status: Joi.string().valid("active", "inactive"),
}).min(1);
