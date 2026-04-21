import express from "express";
import { auth } from "../middleware/auth.js";
import { controllerGetUserTasks } from "../controllers/taskController.js";

const router = express.Router();

// GET user tasks
router.get("/", auth, controllerGetUserTasks);

export { router };
