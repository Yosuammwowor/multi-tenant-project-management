import express from "express";
import { auth } from "../middleware/auth.js";
import {
  controllerGetAllUsers,
  controllerRegister,
  controllerLogin,
} from "../controllers/userController.js";

const router = express.Router();

// Register
router.post("/register", controllerRegister);
// Login
router.post("/login", controllerLogin);

// GET all users
router.get("/", auth, controllerGetAllUsers);

export { router };
