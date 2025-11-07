import express from "express";
import authController from "../controllers/auth.controller.js"; // ⭐ Ganti dari userController
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ==========================================
// PUBLIC ROUTES (No authentication needed)
// ==========================================
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);

// ==========================================
// PROTECTED ROUTES (Need authentication)
// ==========================================
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
