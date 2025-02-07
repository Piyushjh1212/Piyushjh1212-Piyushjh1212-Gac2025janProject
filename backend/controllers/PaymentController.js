import crypto from "crypto";
import { createRazorpayInstance } from "../config/razorPayConfig.js"; // Ensure correct path

const razorpayInstance = createRazorpayInstance();

// Create an order for course payment
export const createOrder = async (req, res) => {
  try {
    const { courseId, amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // Convert to paisa
      currency: "INR",
      receipt: `receipt_${courseId}_${Date.now()}`, // Unique receipt
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.error("Error creating order:", err);
        return res.status(500).json({
          success: false,
          message: "Something went wrong while creating the order",
        });
      }
      console.log("Order created successfully:", order);
      return res.status(200).json({ success: true, order });
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Verify payment signature
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${orderId}|${paymentId}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      console.log("Payment verified successfully:", paymentId);
      return res.status(200).json({ success: true, message: "Payment verified" });
    } else {
      console.error("Payment verification failed:", paymentId);
      return res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
