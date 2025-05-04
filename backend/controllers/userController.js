import userModel from "../models/userModel.js";
import getDataUri from "../utils/features.js";
import { v2 as cloudinary } from "cloudinary";

// Register User
export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    const existing_User = await userModel.findOne({ email });
    if (existing_User) {
      return res
        .status(409)
        .json({ success: false, message: `Email ${email} already exists!` });
    }

    // saveed to the mongodb

    const user = await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
    });
    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Register user API failed", error });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email or Password is required." });
    }

    const user = await userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials." });
    }

    const token = user.generateToken();
    user.password = undefined;

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV !== "Development",
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "User logged in successfully",
        token,
        user,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in login API", error });
  }
};



// Get User Profile
export const getUserProfileController = async (req, res) => {
  try {
    const user = req.user;
    user.password = undefined;
    res
      .status(200)
      .json({
        success: true,
        message: "User profile fetched successfully",
        user,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching user profile", error });
  }
};

// Logout
export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(0), httpOnly: true })
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Logout API error", error });
  }
};

// Update Profile
export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    Object.assign(user, req.body);
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating profile", error });
  }
};

// Update Password
export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;

    if (
      !oldPassword ||
      !newPassword ||
      !(await user.comparePassword(oldPassword))
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Incorrect old password or missing fields",
        });
    }
    user.password = newPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating password", error });
  }
};

// Update Profile Picture
export const updateProfilePicController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const file = getDataUri(req.file);

    if (user.profilePic?.public_id) {
      await cloudinary.uploader.destroy(user.profilePic.public_id);
    }

    const uploadResult = await cloudinary.uploader.upload(file.content);
    user.profilePic = {
      public_id: uploadResult.public_id,
      url: uploadResult.secure_url,
    };
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile picture updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating profile picture",
        error,
      });
  }
};

// Get all users
export const getAllUserController = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    console.log(allUsers);
    res
      .status(200)
      .json({ success: true, message: "Users fetched successfully", allUsers });
  } catch (error) {
    console.error("Error fetching users:", error.name, error.message);
    res
      .status(500)
      .json({
        success: false,
        message: `Error fetching users: ${error.message}`,
      });
  }
};
