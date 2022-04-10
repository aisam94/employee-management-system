import express from "express";
import {
  getAllDepartment,
  getDepartmentById,
  addDepartment,
  updateDepartmentById,
  deleteDepartment,
} from "../controllers/departmentControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAllDepartment);
router.route("/:id").get(protect, getDepartmentById);
router.route("/").post(protect, addDepartment);
router.route("/:id").put(protect, updateDepartmentById);
router.route("/:id").delete(protect, deleteDepartment);

export default router;
