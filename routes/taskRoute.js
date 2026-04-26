import express from "express";
import { auth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleCheck.js";
import {
  controllerGetUserTasks,
  controllerCreateTask,
  controllerChangeOfDuty,
} from "../controllers/taskController.js";

const router = express.Router();

// GET user tasks
router.get("/", auth, controllerGetUserTasks);

// POST create task
router.post("/", auth, roleCheck("admin"), controllerCreateTask);

// PATCH assign user task
router.patch("/:id", auth, roleCheck("admin"), controllerChangeOfDuty);

export { router };
