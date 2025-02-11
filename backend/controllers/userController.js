import userModel from "../models/userModel.js";
import getDataUri from "../utils/features.js";
import { v2 as cloudinary } from "cloudinary";

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
      return res.status(505).send({
        success: false,
        message: "please provide all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: `Email ${email} Allready Exist!`,
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    res.status(501).send({
      success: false,
      message: "error in register api",
      error,
    });
    console.log(error);
  }
};

// loging controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Email or Password is Required.",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }

    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credential.",
      });
    }

    // token
    const token = user.generateToken();
    user.password = undefined;

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "Development" ? true : false,
        httpOnly: process.env.NODE_ENV === "Development" ? true : false,
        sameSite: process.env.NODE_ENV === "Development" ? true : false,
      })
      .send({
        success: true,
        message: "User Logined Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login!",
      error,
    });
  }
};

//Get user profile
export const getUserProfileController = async (req, res) => {
  console.log(req.user);
  const user = req.user;
  console.log(user);
  user.password = undefined;
  try {
    res.status(200).send({
      success: true,
      message: "User Profile Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Problem in getUserProfileController api",
      error,
    });
  }
};

// Logout
export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "Development" ? true : false,
        httpOnly: process.env.NODE_ENV === "Development" ? true : false,
        sameSite: process.env.NODE_ENV === "Development" ? true : false,
      })
      .send({
        success: true,
        message: "User logout successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "logout api problem",
      error,
    });
  }
};

// update profile

export const updateProfileConroller = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, address, city, country, phone } = req.body;
    // validation
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;
    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update-profile api",
      error,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user);
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword);
    console.log(newPassword);
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Password Field is required",
      });
    }

    // old password check
    const isMatchPass = await user.comparePassword(oldPassword);
    //validation
    if (!isMatchPass) {
      return res.status(500).send({
        success: true,
        message: "Old Password Does Not Match",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Your password updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in update password api",
    });
  }
};

// Profile Picture Updating With the Multer And Cloudinary DataBase

export const updateProfilePicController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const file = getDataUri(req.file);

    console.log(user);
    console.log(file);

    // cloudinary
    // delete previous image
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    // update
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      name: cdb.public_id,
      url: cdb.secure_url,
    };

    //save function

    await user.save();

    res.status(200).send({
      success: true,
      message: "profile picture changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in update profile pic api",
    });
  }
};

export const uploadProfilePic = async (req, res) => {
  console.log("hello");
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // console.log(req.file);
    // console.log(req.user.id);
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mern-uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    console.log(result);

    user.profilePic = { public_id: result.public_id, url: result.secure_url };
    const savedUser = await user.save();
    console.log("User saved successfully:", savedUser);
    return res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};
