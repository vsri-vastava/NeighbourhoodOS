import express from "express";

import {
  createProduct,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/productController.js";

import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

console.log("✅ productRoutes loaded");

// =========================
// Public Routes
// =========================

// Browse marketplace
router.get("/", getAllProducts);

// =========================
// Protected Routes
// =========================

router.use(authMiddleware);
router.use(authorizeRoles("resident"));

router.post("/", createProduct);

router.get("/my-products", getMyProducts);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;