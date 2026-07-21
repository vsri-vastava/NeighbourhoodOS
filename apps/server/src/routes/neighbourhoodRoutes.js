import express from "express";
import { createNeighbourhood } from "../controllers/neighbourhoodController.js";
import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Neighbourhood
router.post(
  "/create",
  authMiddleware,
  authorizeRoles("resident"),
  createNeighbourhood
);

export default router;