import Product from "../models/Product.js";
import Seller from "../models/Seller.js";

class ProductService {
  // ==========================
  // Create Product
  // ==========================
  static async createProduct(userId, productData) {
    const seller = await Seller.findOne({ userId });

    if (!seller) {
      throw new Error("Seller profile not found.");
    }

    const product = await Product.create({
      sellerId: seller._id,
      neighbourhoodId: seller.neighbourhoodId,

      name: productData.name.trim(),
      description: productData.description?.trim() || "",

      category: productData.category,
      subCategory: productData.subCategory || "",
      brand: productData.brand || "",

      price: productData.price,
      discountPrice: productData.discountPrice || 0,

      stock: productData.stock,
      unit: productData.unit || "piece",

      images: productData.images || [],

      isAvailable: true,
      isFeatured: false,
    });

    return product;
  }

  // ==========================
  // Get My Products
  // ==========================
  static async getMyProducts(userId) {
    const seller = await Seller.findOne({ userId });

    if (!seller) {
      throw new Error("Seller profile not found.");
    }

    return await Product.find({
      sellerId: seller._id,
    }).sort({
      createdAt: -1,
    });
  }

  // ==========================
  // Get Product By ID
  // ==========================
  static async getProductById(userId, productId) {
    const seller = await Seller.findOne({ userId });

    if (!seller) {
      throw new Error("Seller profile not found.");
    }

    const product = await Product.findOne({
      _id: productId,
      sellerId: seller._id,
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    return product;
  }

  // ==========================
  // Update Product
  // ==========================
  static async updateProduct(userId, productId, updates) {
    const seller = await Seller.findOne({ userId });

    if (!seller) {
      throw new Error("Seller profile not found.");
    }

    const product = await Product.findOne({
      _id: productId,
      sellerId: seller._id,
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    Object.assign(product, updates);

    await product.save();

    return product;
  }

  // ==========================
  // Delete Product
  // ==========================
  static async deleteProduct(userId, productId) {
    const seller = await Seller.findOne({ userId });

    if (!seller) {
      throw new Error("Seller profile not found.");
    }

    const product = await Product.findOne({
      _id: productId,
      sellerId: seller._id,
    });

    if (!product) {
      throw new Error("Product not found.");
    }

    await product.deleteOne();

    return true;
  }
}

export default ProductService;