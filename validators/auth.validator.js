import Joi from "joi";

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/;

export const createAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .message("Password must be 6-30 chars and contain valid characters")
    .required(),
});
