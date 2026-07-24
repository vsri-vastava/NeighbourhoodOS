import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ==========================
    // Basic Information
    // ==========================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    // ==========================
    // User Role
    // ==========================

    role: {
      type: String,
      enum: ["resident", "seller", "society_admin", "super_admin"],
      default: "resident",
    },

    // ==========================
    // Profile
    // ==========================

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "",
    },

    // ==========================
    // Account Status
    // ==========================

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // ==========================
    // Relationships
    // ==========================

    neighbourhoodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Neighbourhood",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;