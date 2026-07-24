import Product from "../models/Product.js";
import Seller from "../models/Seller.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      stock,
      images,
    } = req.body;

    // Validate required fields
    if (!name || !category || price === undefined || stock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, category, price and stock are required.",
      });
    }

    // Find seller profile of logged-in user
    const seller = await Seller.findOne({ userId: req.user.id });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found.",
      });
    }

    const product = await Product.create({
      sellerId: seller._id,
      neighbourhoodId: seller.neighbourhoodId,
      name: name.trim(),
      description: description?.trim() || "",
      category: category.trim(),
      price,
      stock,
      images: images || [],
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get My Products
export const getMyProducts = async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user.id });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found.",
      });
    }

    const products = await Product.find({
      sellerId: seller._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get My Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const seller = await Seller.findOne({ userId: req.user.id });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found.",
      });
    }

    const product = await Product.findOne({
      _id: id,
      sellerId: seller._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get Product By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const seller = await Seller.findOne({ userId: req.user.id });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found.",
      });
    }

    const product = await Product.findOne({
      _id: id,
      sellerId: seller._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const {
      name,
      description,
      category,
      price,
      stock,
      images,
      isAvailable,
    } = req.body;

    product.name = name?.trim() ?? product.name;
    product.description = description?.trim() ?? product.description;
    product.category = category?.trim() ?? product.category;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.images = images ?? product.images;
    product.isAvailable = isAvailable ?? product.isAvailable;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const seller = await Seller.findOne({ userId: req.user.id });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found.",
      });
    }

    const product = await Product.findOne({
      _id: id,
      sellerId: seller._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// =========================================
// Get All Available Products (Public)
// =========================================
export const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      sort = "latest",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      isAvailable: true,
    };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    let sortOption = { createdAt: -1 };

    if (sort === "price") {
      sortOption = { price: 1 };
    } else if (sort === "price-desc") {
      sortOption = { price: -1 };
    } else if (sort === "rating") {
      sortOption = { rating: -1 };
    }

    const products = await Product.find(query)
      .populate("sellerId", "businessName")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Get All Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};