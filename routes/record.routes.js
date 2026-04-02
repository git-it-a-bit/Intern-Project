import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import {
  createRecordSchema,
  updateRecordSchema,
} from "../validators/record.validator.js";
import {
  createRecord,
  getRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";
import { verifyInput } from "../middlewares/verifyInput.js";
const router = express.Router();

router.use(verifyToken);

router.post(
  "/create",
  verifyRole("admin"),
  verifyInput(createRecordSchema),
  createRecord,
);
router.get("/single/:id", verifyRole("admin", "analyst", "viewer"), getRecord);
router.get("/", verifyRole("admin", "analyst", "viewer"), getRecords);
router.patch(
  "/update/:id",
  verifyRole("admin"),
  verifyInput(updateRecordSchema),
  updateRecord,
);
router.delete("/delete/:id", verifyRole("admin"), deleteRecord);

export default router;
