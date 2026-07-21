import mongoose from "mongoose";

const neighbourhoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    inviteCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Neighbourhood = mongoose.model(
  "Neighbourhood",
  neighbourhoodSchema
);

export default Neighbourhood;