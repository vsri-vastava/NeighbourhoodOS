import Seller from "../models/Seller.js";
import User from "../models/User.js";

// ======================================================
// Create Seller Profile
// ======================================================
export const createSellerProfile = async (req, res) => {
  try {
    let { businessName, businessCategory, description, phone } = req.body;

    // Trim input values
    businessName = businessName?.trim();
    businessCategory = businessCategory?.trim();
    description = description?.trim();
    phone = phone?.trim();

    // Validate required fields
    if (!businessName || !businessCategory || !phone) {
      return res.status(400).json({
        success: false,
        message:
          "Business name, business category, and phone are required.",
      });
    }

    // Validate phone number
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits.",
      });
    }

    // Find current user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // User must belong to a neighbourhood
    if (!user.neighbourhoodId) {
      return res.status(400).json({
        success: false,
        message: "Join a neighbourhood before becoming a seller.",
      });
    }

    // Check if seller profile already exists
    const existingSeller = await Seller.findOne({
      userId: req.user.id,
    });

    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller profile already exists.",
      });
    }

    // Create seller profile
    const seller = await Seller.create({
      userId: req.user.id,
      neighbourhoodId: user.neighbourhoodId,
      businessName,
      businessCategory,
      description,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Seller profile created successfully.",
      data: seller,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create seller profile.",
      error: error.message,
    });
  }
};

// ======================================================
// Get My Seller Profile
// ======================================================
export const getMySellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findOne({
      userId: req.user.id,
    })
      .populate("userId", "name email")
      .populate("neighbourhoodId", "name inviteCode");

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: seller,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch seller profile.",
      error: error.message,
    });
  }
};
// ======================================================
// Update Seller Profile
// ======================================================
export const updateSellerProfile = async (req, res) => {
  try {
    let { businessName, businessCategory, description, phone } = req.body;

    // Trim input values
    businessName = businessName?.trim();
    businessCategory = businessCategory?.trim();
    description = description?.trim();
    phone = phone?.trim();

    // Find seller profile
    const seller = await Seller.findOne({
      userId: req.user.id,
    });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found.",
      });
    }

    // Validate phone number if provided
    if (phone !== undefined && !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits.",
      });
    }

    // Update only provided fields
    seller.businessName = businessName ?? seller.businessName;
    seller.businessCategory =
      businessCategory ?? seller.businessCategory;
    seller.description = description ?? seller.description;
    seller.phone = phone ?? seller.phone;

    await seller.save();

    const updatedSeller = await Seller.findById(seller._id)
      .populate("userId", "name email")
      .populate("neighbourhoodId", "name inviteCode");

    return res.status(200).json({
      success: true,
      message: "Seller profile updated successfully.",
      data: updatedSeller,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update seller profile.",
      error: error.message,
    });
  }
};