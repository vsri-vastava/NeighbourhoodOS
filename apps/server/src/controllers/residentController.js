import User from "../models/User.js";

// ======================================================
// Get All Residents of My Neighbourhood
// ======================================================
export const getResidents = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!currentUser.neighbourhoodId) {
      return res.status(400).json({
        success: false,
        message: "You are not part of any neighbourhood.",
      });
    }

    const residents = await User.find({
      neighbourhoodId: currentUser.neighbourhoodId,
    }).select("_id name email role profileCompleted isVerified");

    return res.status(200).json({
      success: true,
      count: residents.length,
      data: residents,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch residents.",
      error: error.message,
    });
  }
};

// ======================================================
// Get Resident By ID
// ======================================================
export const getResidentById = async (req, res) => {
  try {
    const { id } = req.params;

    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!currentUser.neighbourhoodId) {
      return res.status(400).json({
        success: false,
        message: "You are not part of any neighbourhood.",
      });
    }

    const resident = await User.findById(id).select(
      "_id name email role profileCompleted isVerified neighbourhoodId"
    );

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: "Resident not found.",
      });
    }

    if (
      resident.neighbourhoodId.toString() !==
      currentUser.neighbourhoodId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    return res.status(200).json({
      success: true,
      data: resident,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resident.",
      error: error.message,
    });
  }
};

// ======================================================
// Search Residents
// ======================================================
export const searchResidents = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required.",
      });
    }

    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!currentUser.neighbourhoodId) {
      return res.status(400).json({
        success: false,
        message: "You are not part of any neighbourhood.",
      });
    }

    const residents = await User.find({
      neighbourhoodId: currentUser.neighbourhoodId,
      name: {
        $regex: name.trim(),
        $options: "i",
      },
    }).select("_id name email role profileCompleted isVerified");

    return res.status(200).json({
      success: true,
      count: residents.length,
      data: residents,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to search residents.",
      error: error.message,
    });
  }
};

// ======================================================
// Get Resident Statistics
// ======================================================
export const getResidentStats = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!currentUser.neighbourhoodId) {
      return res.status(400).json({
        success: false,
        message: "You are not part of any neighbourhood.",
      });
    }

    const totalResidents = await User.countDocuments({
      neighbourhoodId: currentUser.neighbourhoodId,
    });

    const verifiedResidents = await User.countDocuments({
      neighbourhoodId: currentUser.neighbourhoodId,
      isVerified: true,
    });

    const profileCompletedResidents = await User.countDocuments({
      neighbourhoodId: currentUser.neighbourhoodId,
      profileCompleted: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        totalResidents,
        verifiedResidents,
        profileCompletedResidents,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resident statistics.",
      error: error.message,
    });
  }
};

// ======================================================
// Update Resident Profile
// ======================================================
export const updateResidentProfile = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const { name, phone, address, bio } = req.body;

    currentUser.name = name || currentUser.name;
    currentUser.phone = phone || currentUser.phone;
    currentUser.address = address || currentUser.address;
    currentUser.bio = bio || currentUser.bio;

    // Mark profile as completed if all required fields are filled
    if (
      currentUser.name &&
      currentUser.phone &&
      currentUser.address &&
      currentUser.bio
    ) {
      currentUser.profileCompleted = true;
    }

    await currentUser.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        bio: currentUser.bio,
        role: currentUser.role,
        profileCompleted: currentUser.profileCompleted,
        isVerified: currentUser.isVerified,
        neighbourhoodId: currentUser.neighbourhoodId,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
      error: error.message,
    });
  }
};