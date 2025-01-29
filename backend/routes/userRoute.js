import express from 'express';
import userSignupController from '../controllers/usersignupcontroller.js';
import userlogincontroller from '../controllers/userlogincontroller.js'

const userRouter = express.Router();

userRouter.post("/signup", userSignupController);
userRouter.post("/login", userlogincontroller)

export default userRouter;