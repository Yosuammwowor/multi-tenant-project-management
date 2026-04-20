import express from "express";
import { auth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleCheck.js";
import {
  controllerGetUserProjects,
  controllerCreateProject,
} from "../controllers/projectController.js";

const router = express.Router();

// GET user projects
router.get("/", auth, roleCheck("user"), controllerGetUserProjects);

// POST create project
router.post("/", auth, roleCheck("admin"), controllerCreateProject);

export { router };
