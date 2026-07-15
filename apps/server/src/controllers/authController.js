import User from "../models/User.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
const { name, email, password } = req.body;
if (!name || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "Please provide name, email and password.",
  });
}
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(409).json({
    success: false,
    message: "User already exists with this email.",
  });
}
const hashedPassword = await bcrypt.hash(password, 10);

console.log(hashedPassword);
   const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

return res.status(201).json({
  success: true,
  message: "User registered successfully.",
  data: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found.",
  });
}
const isPasswordMatch = await bcrypt.compare(password, user.password);
console.log("Entered Password:", password);
console.log("Stored Hash:", user.password);
console.log("Password Match:", isPasswordMatch);
if (!isPasswordMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password.",
  });
}
    return res.status(200).json({
      success: true,
      message: "Validation successful.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};