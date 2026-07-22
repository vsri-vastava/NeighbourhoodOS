import express from "express";

import {
  getResidents,
  getResidentById,
  searchResidents,
  getResidentStats,
  updateResidentProfile,
} from "../controllers/residentController.js";

import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================================================
// Apply Authentication & Authorization Middleware
// ======================================================

router.use(authMiddleware);
router.use(authorizeRoles("resident"));

// ======================================================
// Resident Routes
// ======================================================

// Search Residents
// GET /api/residents/search?name=rahul
router.get("/search", searchResidents);

// Resident Statistics
// GET /api/residents/stats
router.get("/stats", getResidentStats);

// Update Logged-in Resident Profile
// PUT /api/residents/profile
router.put("/profile", updateResidentProfile);

// Get All Residents of My Neighbourhood
// GET /api/residents
router.get("/", getResidents);

// Get Resident By ID
// GET /api/residents/:id
router.get("/:id", getResidentById);

export default router;