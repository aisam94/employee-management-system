import express from "express";
import {
  getAllRoles,
  getRoleById,
  addRole,
  updateRoleById,
  deleteRole,
} from "../controllers/rolesControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAllRoles);
router.route("/:id").get(protect, getRoleById);
router.route("/").post(protect, addRole);
router.route("/:id").put(protect, updateRoleById);
router.route("/:id").delete(protect, deleteRole);

export default router;
