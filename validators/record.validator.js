import Joi from "joi";

export const createRecordSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().trim().required(),
  date: Joi.date().optional(),
  desc: Joi.string().max(200).optional(),
});

export const updateRecordSchema = Joi.object({
  amount: Joi.number().min(0).messages({
    "number.base": "Amount must be a number",
    "number.min": "Amount cannot be negative",
  }),

  type: Joi.string().valid("income", "expense").messages({
    "any.only": "Type must be either 'income' or 'expense'",
  }),

  category: Joi.string().trim().min(1).messages({
    "string.empty": "Category cannot be empty",
  }),

  date: Joi.date().messages({
    "date.base": "Invalid date format",
  }),

  desc: Joi.string().trim().max(200).messages({
    "string.max": "Description cannot exceed 200 characters",
  }),
})
  .min(1) // 🔥 at least one field must be provided
  .options({ stripUnknown: true }); // 🔥 removes unwanted fields
