import express from "express";

// import isAuth from "../middlewares/auth.js";
import { CreateRazorPayOrder, GetAllOrdersControllers, verifyRazorPayOrder} from "../Controller/RazorpayController.js";
import { isAuth } from "../Middlewear/UserAuth.js";

const razorPayRouter = express.Router();

razorPayRouter.post("/create-order",isAuth, CreateRazorPayOrder);

razorPayRouter.post("/verify-order", isAuth, verifyRazorPayOrder);

razorPayRouter.get("/Get-All-Orders", GetAllOrdersControllers)


export default razorPayRouter;
