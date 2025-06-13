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

    const newUser = UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        messaeg: `Signup failed please try again`,
      });
    }

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

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
