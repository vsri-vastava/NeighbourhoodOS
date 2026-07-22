import { PRODUCT_CATEGORIES, PRODUCT_UNITS } from "../constants/productConstants.js";

export const validateCreateProduct = (data) => {
  const errors = [];

  const {
    name,
    description,
    category,
    subCategory,
    brand,
    price,
    discountPrice,
    stock,
    unit,
    images,
  } = data;

  // Name
  if (!name || name.trim().length < 2) {
    errors.push("Product name must be at least 2 characters long.");
  }

  // Category
  if (!category || !PRODUCT_CATEGORIES.includes(category)) {
    errors.push("Invalid product category.");
  }

  // Price
  if (price === undefined || price < 0) {
    errors.push("Price must be greater than or equal to 0.");
  }

  // Discount Price
  if (
    discountPrice !== undefined &&
    discountPrice > price
  ) {
    errors.push("Discount price cannot be greater than price.");
  }

  // Stock
  if (stock === undefined || stock < 0) {
    errors.push("Stock cannot be negative.");
  }

  // Unit
  if (unit && !PRODUCT_UNITS.includes(unit)) {
    errors.push("Invalid product unit.");
  }

  // Images
  if (images && !Array.isArray(images)) {
    errors.push("Images must be an array.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateUpdateProduct = (data) => {
  const errors = [];

  if (
    data.category &&
    !PRODUCT_CATEGORIES.includes(data.category)
  ) {
    errors.push("Invalid product category.");
  }

  if (
    data.unit &&
    !PRODUCT_UNITS.includes(data.unit)
  ) {
    errors.push("Invalid product unit.");
  }

  if (
    data.price !== undefined &&
    data.price < 0
  ) {
    errors.push("Price cannot be negative.");
  }

  if (
    data.stock !== undefined &&
    data.stock < 0
  ) {
    errors.push("Stock cannot be negative.");
  }

  if (
    data.discountPrice !== undefined &&
    data.price !== undefined &&
    data.discountPrice > data.price
  ) {
    errors.push("Discount price cannot exceed price.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};