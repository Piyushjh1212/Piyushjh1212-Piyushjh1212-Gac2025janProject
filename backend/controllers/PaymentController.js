import crypto from "crypto";
import { createRazorpayInstance } from "../config/razorPayConfig.js";
import Payment from "../models/Paymentmodel.js";

const razorpayInstance = createRazorpayInstance();

// **Create Order API**
export const createOrder = async (req, res) => {
  try {
    const {
      courseId,
      amount,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    } = req.body;

    const userId = req.user?._id;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    // Check if user already purchased the course
    const previousOrder = await Payment.findOne({ courseId, userId });

    if (previousOrder) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this course.",
      });
    }

    // Prepare Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    // Set expiry date (5 years from now)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 5);

    // Create a new order in the database
    const newOrder = await Payment.create({
      courseId: courseId,
      userId: userId,
      name: `${firstName} ${lastName}`,
      email: email,
      amount: amount,
      phone: phone,
      paymentMethod: "Razorpay",
      transactionId: order.id, // Store the Razorpay order ID
      paymentStatus: "Pending",
      paymentDate: new Date(),
      expiryDate: expiryDate, // Store expiry date
      paymentResponse: {}, // Optional: Store full payment response
    });

    return res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// **Verify Payment API**
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    // Generate HMAC signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Update payment status to success
      const successOrderStatus = await Payment.findOneAndUpdate(
        { transactionId: razorpay_order_id }, // Find payment using Razorpay order ID
        { $set: { paymentStatus: "Success", paymentResponse: req.body } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed due to signature mismatch",
      });
    }
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
