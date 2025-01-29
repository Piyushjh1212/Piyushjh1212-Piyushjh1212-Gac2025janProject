import userModel from "../models/Usermodel.js";

const userSignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
       return res.status(400).json({ message: "Please provide all fields" });
    }

    // Check if user already exists
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user

    const user = await userModel.create({
      name,
      email,
      password,
    });

    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export default userSignupController;