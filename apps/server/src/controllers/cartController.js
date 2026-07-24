import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// =========================================
// Add Product to Cart
// =========================================
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const product = await Product.findById(productId);

    if (!product || !product.isAvailable) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unavailable.",
      });
    }

    let cart = await Cart.findOne({
      residentId: req.user.id,
    });

    if (!cart) {
      cart = new Cart({
        residentId: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
      existingItem.subtotal =
        existingItem.quantity * existingItem.priceAtAddition;
    } else {
      cart.items.push({
        productId: product._id,
        sellerId: product.sellerId,
        quantity: Number(quantity),
        priceAtAddition: product.price,
        subtotal: product.price * Number(quantity),
      });
    }

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart.",
      data: cart,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// =========================================
// View Cart
// =========================================
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      residentId: req.user.id,
    })
      .populate("items.productId")
      .populate("items.sellerId", "businessName");

    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
          totalAmount: 0,
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Get Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// =========================================
// Update Cart Quantity
// =========================================
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1.",
      });
    }

    const cart = await Cart.findOne({
      residentId: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }

    item.quantity = Number(quantity);
    item.subtotal = item.quantity * item.priceAtAddition;

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      data: cart,
    });
  } catch (error) {
    console.error("Update Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// =========================================
// Remove Item From Cart
// =========================================
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      residentId: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.productId.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart.",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalAmount = cart.items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      data: cart,
    });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// =========================================
// Clear Cart
// =========================================
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      residentId: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
      data: cart,
    });
  } catch (error) {
    console.error("Clear Cart Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};