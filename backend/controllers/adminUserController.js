import adminUserModel from "../models/adminModel.js";
// import userModel from "../models/userModel.js";

export const createAdminUserController = async (req, res) => {
  try {
    const { adminUserName, adminPassword, profilePicture } = req.body;
    console.log(req.body);

    if (!adminPassword || !adminUserName || !profilePicture) {
      return res.status(505).send({
        success: false,
        message: "please provide all fields",
      });
    }

    const existingUser = await adminUserModel.findOne({ adminUserName });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: `Email ${adminUserName} Allready Exist!`,
      });
    }

    const user = await adminUserModel.create({
      adminUserName,
      adminPassword,
      profilePicture,
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

export const loginAdminUserController = async (req, res) => {
  try {
    const { adminUserName, adminPassword } = req.body;
    // validation
    if (!adminUserName || !adminPassword) {
      return res.status(500).send({
        success: false,
        message: "Email or Password is Required.",
      });
    }

    // check user
    const user = await adminUserModel.findOne({ adminUserName });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }

    console.log(user)

    // check password
    const isMatch = await user.comparePassword(adminPassword);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credential.",
      });
    }


    // token
    const adminToken = user.generateToken();
    user.adminPassword = undefined;

    res
      .status(200)
      .cookie("adminToken", adminToken, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "Development" ? true : false,
        httpOnly: process.env.NODE_ENV === "Development" ? true : false,
        sameSite: process.env.NODE_ENV === "Development" ? true : false,
      })
      .send({
        success: true,
        message: "Admin Logined Successfully",
        adminToken,
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

// Logout
// export const logoutController = async (req, res) => {
//   try {
//     res
//       .status(200)
//       .cookie("token", "", {
//         expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//         secure: process.env.NODE_ENV === "Development" ? true : false,
//         httpOnly: process.env.NODE_ENV === "Development" ? true : false,
//         sameSite: process.env.NODE_ENV === "Development" ? true : false,
//       })
//       .send({
//         success: true,
//         message: "User logout successfully",
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "logout api problem",
//       error,
//     });
//   }
// };

// export const updatePasswordController = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     console.log(user);
//     const { oldPassword, newPassword } = req.body;
//     console.log(oldPassword);
//     console.log(newPassword);
//     if (!oldPassword || !newPassword) {
//       return res.status(500).send({
//         success: false,
//         message: "Password Field is required",
//       });
//     }

//     // old password check
//     const isMatchPass = await user.comparePassword(oldPassword);
//     //validation
//     if (!isMatchPass) {
//       return res.status(500).send({
//         success: true,
//         message: "Old Password Does Not Match",
//       });
//     }
//     user.password = newPassword;
//     await user.save();
//     res.status(200).send({
//       success: true,
//       message: "Your password updated successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "error in update password api",
//     });
//   }
// };
