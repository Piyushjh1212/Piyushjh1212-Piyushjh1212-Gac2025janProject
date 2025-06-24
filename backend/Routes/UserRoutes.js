import express from "express";
import { verifyGoogleToken } from "../Middlewear/googleauth.js";
import { getUserData, googleLogin, userSignUp } from "../Controller/authController.js";
import { isAuth } from "../Middlewear/UserAuth.js";

const UserRoutes = express.Router();

UserRoutes.post("/google-login", verifyGoogleToken, googleLogin);
UserRoutes.post("/sign-up", userSignUp);
UserRoutes.get("/Get-User", isAuth, getUserData);

export default UserRoutes;
