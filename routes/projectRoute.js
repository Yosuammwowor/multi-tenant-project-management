import express from "express";
import { auth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleCheck.js";
import { controllerGetUserProjects } from "../controllers/projectController.js";

const router = express.Router();

// GET user projects
router.get("/", auth, roleCheck("user"), controllerGetUserProjects);

export { router };
