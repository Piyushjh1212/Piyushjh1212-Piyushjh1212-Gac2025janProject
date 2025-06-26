// middlewares/isAuth.js

import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token)
    // If no token found, deny access
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Token not found." });
    }

    // Verify token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
