import express from "express";
import { createOrderController } from "../controllers/orderController.js";
import { isAuth } from "../middlewares/AutheMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", isAuth, createOrderController);

export default orderRouter;
