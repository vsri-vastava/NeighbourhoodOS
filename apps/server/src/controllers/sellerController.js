import Seller from "../models/Seller.js";
import User from "../models/User.js";

// ======================================================
// Create Seller Profile
// ======================================================
export const createSellerProfile = async (req, res) => {
  try {
    let {
      businessName,
      businessCategory,
      description,
      phone,
      businessAddress,
      deliveryRadius,
      gstNumber,
      storeLogo,
    } = req.body;

    // Trim string inputs
    businessName = businessName?.trim();
    businessCategory = businessCategory?.trim();
    description = description?.trim();
    phone = phone?.trim();
    businessAddress = businessAddress?.trim();
    gstNumber = gstNumber?.trim();
    storeLogo = storeLogo?.trim();

    // Convert deliveryRadius to number
    deliveryRadius =
      deliveryRadius !== undefined
        ? Number(deliveryRadius)
        : 5;

    // Validate required fields
    if (
      !businessName ||
      !businessCategory ||
      !phone ||
      !businessAddress
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Business name, business category, phone, and business address are required.",
      });
    }

    // Validate phone number
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits.",
      });
    }

    // Validate delivery radius
    if (
      isNaN(deliveryRadius) ||
      deliveryRadius < 1 ||
      deliveryRadius > 50
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Delivery radius must be between 1 and 50 km.",
      });
    }

    // Find logged-in user
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
        message:
          "Join a neighbourhood before becoming a seller.",
      });
    }

    // Check if seller profile already exists
    const existingSeller = await Seller.findOne({
      userId: req.user.id,
    });

    if (existingSeller) {
      return res.status(409).json({
        success: false,
        message: "Seller profile already exists.",
      });
    }

    // Create seller
    const seller = await Seller.create({
      userId: req.user.id,
      neighbourhoodId: user.neighbourhoodId,
      businessName,
      businessCategory,
      description,
      phone,
      businessAddress,
      deliveryRadius,
      gstNumber,
      storeLogo,
    });

    const populatedSeller = await Seller.findById(seller._id)
      .populate("userId", "name email")
      .populate("neighbourhoodId", "name inviteCode");

    return res.status(201).json({
      success: true,
      message: "Seller profile created successfully.",
      data: populatedSeller,
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
    console.log("BODY:", req.body);
    let {
      businessName,
      businessCategory,
      description,
      phone,
      businessAddress,
      deliveryRadius,
      gstNumber,
      storeLogo,
    } = req.body;

    // Trim strings
    businessName = businessName?.trim();
    businessCategory = businessCategory?.trim();
    description = description?.trim();
    phone = phone?.trim();
    businessAddress = businessAddress?.trim();
    gstNumber = gstNumber?.trim();
    storeLogo = storeLogo?.trim();

    // Find seller
    const seller = await Seller.findOne({
      userId: req.user.id,
    });
    console.log("========== SELLER BEFORE UPDATE ==========");
console.log(seller.toObject());
console.log("Incoming businessAddress:", businessAddress);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found.",
      });
    }

    // Validate phone if provided
    if (
      phone !== undefined &&
      !/^[0-9]{10}$/.test(phone)
    ) {
      return res.status(400).json({
        success: false,
        message: "Phone number must contain exactly 10 digits.",
      });
    }

    // Validate delivery radius if provided
    if (deliveryRadius !== undefined) {
      deliveryRadius = Number(deliveryRadius);

      if (
        isNaN(deliveryRadius) ||
        deliveryRadius < 1 ||
        deliveryRadius > 50
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Delivery radius must be between 1 and 50 km.",
        });
      }
    }

    // Update allowed fields only
    if (businessName !== undefined)
      seller.businessName = businessName;

    if (businessCategory !== undefined)
      seller.businessCategory = businessCategory;

    if (description !== undefined)
      seller.description = description;

    if (phone !== undefined)
      seller.phone = phone;

    if (businessAddress !== undefined)
      seller.businessAddress = businessAddress;

    if (deliveryRadius !== undefined)
      seller.deliveryRadius = deliveryRadius;

    if (gstNumber !== undefined)
      seller.gstNumber = gstNumber;

    if (storeLogo !== undefined)
      seller.storeLogo = storeLogo;

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