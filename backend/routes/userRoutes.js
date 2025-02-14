import express from "express";
import multer from "multer";
import {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updateProfileConroller,
  updatePasswordController,
  updateProfilePicController,
  uploadProfilePic,
  getAllUsercontroller,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/AutheMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

// router object
const userRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

// routes
// router.get('/', homeController)
userRouter.post(
  "/user-profile-pic",
  isAuth,
  upload.single("image"),
  uploadProfilePic
);
userRouter.post("/register", registerController);
//login route
userRouter.post("/login", loginController);
// profiel
userRouter.get("/profile", isAuth, getUserProfileController);
// logout
userRouter.get("/logout", isAuth, logoutController);

// update profile
userRouter.post("/update-profile", isAuth, updateProfileConroller);
// update password
userRouter.put("/update-password", isAuth, updatePasswordController);

// update profile pic
userRouter.put(
  "/update-picture",
  isAuth,
  singleUpload,
  updateProfilePicController
);
userRouter.get("/get-all-users", getAllUsercontroller);
export default userRouter;
