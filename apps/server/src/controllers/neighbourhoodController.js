import Neighbourhood from "../models/Neighbourhood.js";
import User from "../models/User.js";

// ======================================================
// Create Neighbourhood
// ======================================================
export const createNeighbourhood = async (req, res) => {
  try {
    const { name, inviteCode } = req.body;

    // Check if invite code already exists
    const existingNeighbourhood = await Neighbourhood.findOne({
      inviteCode,
    });

    if (existingNeighbourhood) {
      return res.status(400).json({
        success: false,
        message: "Invite code already exists.",
      });
    }

    // Create neighbourhood
    const neighbourhood = await Neighbourhood.create({
      name,
      inviteCode,
      createdBy: req.user.id,
    });

    // Link creator to the neighbourhood
    await User.findByIdAndUpdate(req.user.id, {
      neighbourhoodId: neighbourhood._id,
    });

    return res.status(201).json({
      success: true,
      message: "Neighbourhood created successfully.",
      data: neighbourhood,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create neighbourhood.",
    });
  }
};

// ======================================================
// Join Neighbourhood
// ======================================================
export const joinNeighbourhood = async (req, res) => {
  try {
    const { inviteCode } = req.body;

    // Find neighbourhood
    const neighbourhood = await Neighbourhood.findOne({ inviteCode });

    if (!neighbourhood) {
      return res.status(404).json({
        success: false,
        message: "Neighbourhood not found.",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);

    // Check if already part of a neighbourhood
    if (user.neighbourhoodId) {
      return res.status(400).json({
        success: false,
        message: "You are already part of a neighbourhood.",
      });
    }

   // Join neighbourhood
user.neighbourhoodId = neighbourhood._id;
await user.save();

// Fetch updated user without password
const updatedUser = await User.findById(user._id).select("-password");

return res.status(200).json({
  success: true,
  message: "Joined neighbourhood successfully.",
  data: updatedUser,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to join neighbourhood.",
    });
  }
};