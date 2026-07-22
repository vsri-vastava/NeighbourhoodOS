import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    neighbourhoodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Neighbourhood",
      required: true,
    },

    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    businessCategory: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;