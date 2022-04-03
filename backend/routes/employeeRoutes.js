import express from "express";
import {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployeeById,
  deleteEmployee,
} from "../controllers/employeeControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getEmployees);
router.route("/:id").get(protect, getEmployeeById);
router.route("/").post(protect, addEmployee);
router.route("/").put(protect, updateEmployeeById);
router.route("/").delete(protect, deleteEmployee);

export default router;
