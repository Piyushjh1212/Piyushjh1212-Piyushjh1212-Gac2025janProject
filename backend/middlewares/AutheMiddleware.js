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

    // Check if user exists
    const user = await userModel.findById(decodedData._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach the user to the request object (without sensitive data)
    req.user = user;
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
        error: error.message,
      });
    }

    // Handle invalid or malformed token errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
        error: error.message,
      });
    }

    // General error handler for other issues (e.g., database or unexpected errors)
    console.error("Token verification failed:", error);  // Log for debugging purposes
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
