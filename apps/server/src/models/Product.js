import mongoose from "mongoose";
import slugify from "slugify";

import {
  PRODUCT_CATEGORIES,
  PRODUCT_UNITS,
  DEFAULT_RATING,
  DEFAULT_TOTAL_REVIEWS,
} from "../constants/productConstants.js";

const productSchema = new mongoose.Schema(
  {
    // ==========================
    // Ownership
    // ==========================

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    neighbourhoodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Neighbourhood",
      required: true,
      index: true,
    },

    // ==========================
    // Basic Information
    // ==========================

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    // ==========================
    // Classification
    // ==========================

    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: true,
    },

    subCategory: {
      type: String,
      default: "",
      trim: true,
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================
    // Pricing
    // ==========================

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ==========================
    // Inventory
    // ==========================

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    unit: {
      type: String,
      enum: PRODUCT_UNITS,
      default: "piece",
    },

    // ==========================
    // Media
    // ==========================

    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // ==========================
    // Visibility
    // ==========================

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    // ==========================
    // Ratings
    // ==========================

    rating: {
      type: Number,
      default: DEFAULT_RATING,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: DEFAULT_TOTAL_REVIEWS,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// Generate Slug Automatically
// ==========================

productSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug =
    slugify(this.name, {
      lower: true,
      strict: true,
    }) +
    "-" +
    Date.now();

  next();
});

// ==========================
// Indexes
// ==========================

productSchema.index({
  sellerId: 1,
  category: 1,
});

productSchema.index({
  neighbourhoodId: 1,
  category: 1,
});

const Product = mongoose.model("Product", productSchema);

export default Product;