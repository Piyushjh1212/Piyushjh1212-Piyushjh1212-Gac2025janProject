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

    const previosOrder = await Payment.findOne({ courseId });

    console.log(previosOrder.courseId);
    console.log(courseId);

    if (previosOrder.courseId === courseId) {
      return res.status(500).json({
        success: false,
        message: `Course allready purchaged.`,
      });
    }

    const userId = req.user?._id;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

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
      paymentResponse: {}, // Optional: Store full payment response
    });

    return res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// **Verify Payment API**
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      const successOrderStatus = await Payment.findOneAndUpdate(
        { transactionId: razorpay_order_id }, // Find payment using Razorpay order ID
        { $set: { paymentStatus: "Success", paymentResponse: req.body } },
        { new: true }
      );

      return res
        .status(200)
        .json({ success: true, message: "Payment verified" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};
