import express from "express";

// import isAuth from "../middlewares/auth.js";
import { CreateRazorPayOrder, verifyRazorPayOrder} from "../Controller/RazorpayController.js";
import { isAuth } from "../Middlewear/UserAuth.js";

const razorPayRouter = express.Router();

razorPayRouter.post("/create-order",isAuth, CreateRazorPayOrder);
razorPayRouter.post("/verify-order", isAuth, verifyRazorPayOrder);

export default razorPayRouter;
