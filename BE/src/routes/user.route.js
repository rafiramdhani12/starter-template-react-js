import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

// Daftar route
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getById);
router.get("/username/:username", UserController.getByUsername);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// Export router untuk digunakan di app.js
export default router;
