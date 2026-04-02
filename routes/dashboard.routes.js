import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";

import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.use(verifyToken);
router.get("/summary", verifyRole("admin", "analyst"), getDashboardSummary);

export default router;
