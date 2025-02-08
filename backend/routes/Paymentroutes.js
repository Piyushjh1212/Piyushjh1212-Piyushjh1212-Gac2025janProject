// routes/payMentRoute.js
import express from 'express';  // ES Module syntax
import { createOrder, verifyPayment } from '../controllers/PaymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-Order', createOrder);
paymentRouter.post('/verifyPayments', verifyPayment);

export default paymentRouter;  // Export the router as default
