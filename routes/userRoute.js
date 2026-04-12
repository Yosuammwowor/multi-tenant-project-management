import express from "express";
import { controllerGetAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", controllerGetAllUsers);

export { router };
