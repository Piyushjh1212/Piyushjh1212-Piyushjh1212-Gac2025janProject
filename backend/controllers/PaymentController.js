import crypto from "crypto";
import { createRazorpayInstance } from "../config/razorPayConfig.js";

// Initialize Razorpay instance
const razorpayInstance = createRazorpayInstance();

// Create order for course payment
export const createOrder = async (req, res) => {
  const { courseId, amount } = req.body;

  // Validate input amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ success: false, message: "Invalid amount" });
  }

  // Define order options for Razorpay
  const options = {
    amount: amount * 100,  // Convert to paisa (1 INR = 100 paisa)
    currency: "INR",  // Currency type (INR)
    receipt: `receipt_${courseId}_${new Date().getTime()}`,  // Unique receipt ID
  };

  try {
    // Call Razorpay API to create an order
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.error("Error creating order:", err);  // Log any error from Razorpay
        return res.status(500).json({
          success: false,
          message: "Something went wrong while creating the order",
        });
      }
      console.log("Order created successfully:", order);  // Log the created order details
      return res.status(200).json(order);  // Send order details as response
    });
  } catch (error) {
    console.error("Error in createOrder:", error);  // Log unexpected errors
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Verify payment signature
export const verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;  // Secret key from Razorpay account

  // Generate the HMAC to verify the payment signature
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(orderId + "|" + paymentId);
  const generatedSignature = hmac.digest("hex");

  // Verify the signature
  if (generatedSignature === signature) {
    console.log("Payment verified successfully");  // Log successful verification
    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } else {
    console.error("Payment verification failed");  // Log failure to verify payment
    return res.status(400).json({
      success: false,
      message: "Payment not verified",
    });
  }
};
