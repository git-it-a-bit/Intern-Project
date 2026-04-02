import express from "express";
import { verifyInput } from "../middlewares/verifyInput.js";
import { loginUser } from "../controllers/auth.controller.js";
import { createAuthSchema } from "../validators/auth.validator.js";
import loginLimiter from "../middlewares/loginRateLimiter.js";
const router = express.Router();

router.post("/login", loginLimiter, verifyInput(createAuthSchema), loginUser);

export default router;
