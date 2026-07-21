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

    // Logged-in user
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Requested resident
    const resident = await User.findById(id).select(
      "_id name email role profileCompleted isVerified neighbourhoodId"
    );

    if (!resident) {
      return res.status(404).json({
        success: false,
        message: "Resident not found.",
      });
    }

    // Security Check
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