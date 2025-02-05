// routes/payMentRoute.js
import express from 'express';  // ES Module syntax
import { createOrder, verifyPayment } from '../controllers/PaymentController.js';

const router = express.Router();

router.post('/createOrder', createOrder);
router.post('/verifyPayments', verifyPayment);

export default router;  // Export the router as default
