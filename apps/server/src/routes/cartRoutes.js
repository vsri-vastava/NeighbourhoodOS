import express from "express";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

import {
  authMiddleware,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

console.log("✅ cartRoutes loaded");

// Protected Routes
router.use(authMiddleware);
router.use(authorizeRoles("resident"));

// View Cart
router.get("/", getCart);

// Add to Cart
router.post("/", addToCart);

router.put("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);
router.delete("/", clearCart);

export default router;