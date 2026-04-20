import express from "express";
import { auth } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleCheck.js";
import {
  controllerGetAllUsers,
  controllerGetProfile,
  controllerRegister,
  controllerLogin,
  controllerInviteUser,
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
// POST admin invite
router.post("/invite", auth, roleCheck("admin"), controllerInviteUser);

export { router };
