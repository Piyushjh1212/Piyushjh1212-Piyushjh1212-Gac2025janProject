import express from "express";

// import isAuth from "../middlewares/auth.js";
import { CreateRazorPayOrder, verifyRazorPayOrderController } from "../Controller/RazorpayController.js";

const razorPayRouter = express.Router();

razorPayRouter.post("/create-order", CreateRazorPayOrder);
razorPayRouter.post("/verify-order", verifyRazorPayOrderController);

export default razorPayRouter;
