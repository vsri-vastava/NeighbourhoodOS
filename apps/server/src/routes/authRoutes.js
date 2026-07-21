import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================================================
// Public Routes
// ======================================================

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// ======================================================
// Protected Routes (Resident)
// ======================================================

// Get Logged-in User Profile
router.get(
  "/profile",
  authMiddleware,
  authorizeRoles("resident"),
  getProfile
);

// Update Logged-in User Profile
router.patch(
  "/profile",
  authMiddleware,
  authorizeRoles("resident"),
  updateProfile
);
console.log("✅ PATCH /profile route registered");
console.log("✅ authRoutes loaded");
export default router;