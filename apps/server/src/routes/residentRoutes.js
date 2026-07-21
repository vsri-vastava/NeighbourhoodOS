import express from "express";

import {
  getResidents,
  getResidentById,
} from "../controllers/residentController.js";

import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================================================
// Protected Routes (Resident)
// ======================================================

// Get All Residents
router.get(
  "/",
  authMiddleware,
  authorizeRoles("resident"),
  getResidents
);

// Get Resident By ID
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("resident"),
  getResidentById
);

export default router;