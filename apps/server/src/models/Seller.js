import mongoose from "mongoose";
import slugify from "slugify";

const sellerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    neighbourhoodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Neighbourhood",
      required: true,
      index: true,
    },

    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    businessCategory: {
      type: String,
      required: [true, "Business category is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    businessAddress: {
      type: String,
      required: [true, "Business address is required"],
      trim: true,
    },

    storeLogo: {
      type: String,
      default: "",
    },

    gstNumber: {
      type: String,
      trim: true,
      default: "",
    },

    deliveryRadius: {
      type: Number,
      default: 5,
      min: 1,
      max: 50,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug automatically before saving
sellerSchema.pre("save", function () {
  if (this.isModified("businessName")) {
    this.slug = slugify(this.businessName, {
      lower: true,
      strict: true,
    });
  }
 
});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;