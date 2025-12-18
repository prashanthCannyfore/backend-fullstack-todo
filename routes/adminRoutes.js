import express from "express";
import {protect} from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { getAllUsers, getAllTodos } from "../controllers/adminController.js";

const router = express.Router();

// Admin-only routes
router.get("/users", protect, adminMiddleware, getAllUsers);
router.get("/todos", protect, adminMiddleware, getAllTodos);

export default router;
