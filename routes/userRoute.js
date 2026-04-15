import express from "express";
import { auth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleCheck.js";
import {
  controllerGetAllUsers,
  controllerGetProfile,
  controllerRegister,
  controllerLogin,
} from "../controllers/userController.js";

const router = express.Router();

// Register
router.post("/register", controllerRegister);
// Login
router.post("/login", controllerLogin);

// Protected Route
// GET user profile
router.get("/profile", auth, controllerGetProfile);
// GET all users
router.get("/", auth, roleCheck("admin"), controllerGetAllUsers);

export { router };
