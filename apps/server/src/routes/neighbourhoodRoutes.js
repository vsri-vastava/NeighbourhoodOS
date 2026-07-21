import express from "express";

import {
  createNeighbourhood,
  joinNeighbourhood,
} from "../controllers/neighbourhoodController.js";

import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================================================
// Protected Routes (Resident)
// ======================================================

// Create Neighbourhood
router.post(
  "/create",
  authMiddleware,
  authorizeRoles("resident"),
  createNeighbourhood
);

// Join Neighbourhood
router.post(
  "/join",
  authMiddleware,
  authorizeRoles("resident"),
  joinNeighbourhood
);

export default router;