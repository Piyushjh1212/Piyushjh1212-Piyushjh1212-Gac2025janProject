import express from 'express';
import userSignupController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/signup", userSignupController);

export default userRouter;