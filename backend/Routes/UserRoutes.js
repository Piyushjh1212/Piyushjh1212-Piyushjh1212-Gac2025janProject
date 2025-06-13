import express from "express";
import { verifyGoogleToken } from "../Middlewear/googleauth.js";
import { googleLogin, userSignUp } from "../Controller/authController.js";

const UserRoutes = express.Router();

UserRoutes.post("/google-login", verifyGoogleToken, googleLogin);
UserRoutes.post("/sign-up", userSignUp);

export default UserRoutes;
