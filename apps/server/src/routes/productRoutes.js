import express from "express";

import {
  createProduct,
  getMyProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";

import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

console.log("✅ productRoutes loaded");

// All product routes require authentication
router.use(authMiddleware);

// Only residents (who have seller profiles) can manage products
router.use(authorizeRoles("resident"));

// Get all products of logged-in seller
router.get("/my-products", getMyProducts);

// Get single product
router.get("/:id", getProductById);

// Update product
router.put("/:id", updateProduct);

// Create product
router.post("/", createProduct);

export default router;