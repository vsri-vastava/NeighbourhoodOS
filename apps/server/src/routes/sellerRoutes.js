import express from "express";

import {
  createSellerProfile,
  getMySellerProfile,
  updateSellerProfile,
} from "../controllers/sellerController.js";

import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================================================
// Debug
// ======================================================
console.log("✅ sellerRoutes loaded");

// ======================================================
// Apply Authentication & Authorization Middleware
// ======================================================

router.use(authMiddleware);
router.use(authorizeRoles("resident"));

// ======================================================
// Seller Routes
// ======================================================

// Test Route
// GET /api/sellers/test
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Seller routes are working!",
  });
});

// Get My Seller Profile
// GET /api/sellers/me
router.get("/me", getMySellerProfile);

// Update My Seller Profile
// PUT /api/sellers/me
router.put("/me", updateSellerProfile);

// Create Seller Profile
// POST /api/sellers
router.post("/", createSellerProfile);

export default router;