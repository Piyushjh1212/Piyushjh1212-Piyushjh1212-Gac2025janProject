import express from "express";

// import isAuth from "../middlewares/auth.js";
import { CreateRazorPayOrder, verifyRazorPayOrder} from "../Controller/RazorpayController.js";

const razorPayRouter = express.Router();

razorPayRouter.post("/create-order", CreateRazorPayOrder);
razorPayRouter.post("/verify-order", verifyRazorPayOrder);

export default razorPayRouter;
