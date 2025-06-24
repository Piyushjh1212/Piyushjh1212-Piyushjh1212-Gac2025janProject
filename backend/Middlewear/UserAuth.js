// middlewares/isAuth.js

import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  // console.log("hello");
  // console.log(token)
  try {
    // Get token from cookies
    // console.log(token);

    const token = req.cookies.token;
    // If no token found, deny access
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Token not found." });
    }

    // Verify token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    // Attach user info to request
    req.user = decoded;
    // console.log(req.user);
    // Proceed to next middleware/controller
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
