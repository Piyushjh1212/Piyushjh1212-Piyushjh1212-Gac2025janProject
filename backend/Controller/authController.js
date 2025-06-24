import UserModel from "../Modals/UserModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const googleLogin = async (req, res) => {
  const { email, name, picture } = req.googleUser;

  // TODO: Add DB logic if needed

  res.status(200).json({
    user: { email, name, picture },
    message: "Login successful",
  });
};

export const userSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: `All fields are required`,
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(300).json({
        success: false,
        message: `User with this email already exist`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: `Signup failed please try again`,
      });
    }

    console.log(newUser._id);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // console.log(token);

    if (!token) {
      return res.status(400).json({
        success: false,
        message: `Token not created`,
      });
    }

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Signup successfull`,
        data: newUser,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Api error: ${error.name} : ${error.message}`,
    });
  }
};

export const userSignIn = async () => {
  try {
  } catch (error) {}
};

export const logOut = async () => {
  try {
  } catch (error) {}
};

export const forgotPassword = async () => {
  try {
  } catch (error) {}
};

export const getUserData = async (req, res) => {
  console.log(req.user);
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: `User not authenticated`,
      });
    }

    const user = await UserModel.findById(id);
    user.password = undefined;
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Data fetched successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Api error ${error.name} : ${error.message}`,
    });
  }
};
