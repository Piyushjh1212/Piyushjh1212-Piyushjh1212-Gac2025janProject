import crypto from "crypto";
import { createRazorpayInstance } from "../config/razorPayConfig.js";

const razorpayInstance = createRazorpayInstance();

// Create Order API
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error("❌ Error in createOrder:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Verify Payment API
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      console.log("✅ Payment verified successfully:", razorpay_payment_id);
      return res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      console.error("❌ Payment verification failed:", razorpay_payment_id);
      return res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    console.error("❌ Error in verifyPayment:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
