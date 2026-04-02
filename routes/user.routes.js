import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyRole } from "../middlewares/verifyRole.js";
import { verifyInput } from "../middlewares/verifyInput.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validator.js";
const router = express.Router();
import {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/user.controller.js";

router.post("/admin", createUser);

router.use(verifyToken);

router.post(
  "/create",
  verifyRole("admin"),
  verifyInput(createUserSchema),
  createUser,
);
router.get("/single/:id", verifyRole("admin", "analyst", "viewer"), getUser);
router.get("/", verifyRole("admin", "analyst", "viewer"), getUsers);
router.patch(
  "/update/:id",
  verifyRole("admin"),
  verifyInput(updateUserSchema),
  updateUser,
);
router.delete("/delete/:id", verifyRole("admin"), deleteUser);

export default router;
