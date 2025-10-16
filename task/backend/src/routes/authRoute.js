import express from "express";
import { registerController, loginController } from "../controller/authController.js";

const router = express.Router();

// Routes
router.post("/register", registerController);
router.post("/login", loginController);

export default router;
