import express from 'express';
import { createOrder, verifyPayment } from '../controllers/PaymentController.js';
import { isAuth } from '../middlewares/AutheMiddleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-Order', isAuth,createOrder);
paymentRouter.post('/verifyPayments',isAuth, verifyPayment);

export default paymentRouter;
