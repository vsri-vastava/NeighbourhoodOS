import Neighbourhood from "../models/Neighbourhood.js";
import User from "../models/User.js";

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

    // Update logged-in user
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