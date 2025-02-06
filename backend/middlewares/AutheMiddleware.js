import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    // Get token from cookies or headers
    const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }


    // Verify token
    const decodedData = JWT.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decodedData._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(user)
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
