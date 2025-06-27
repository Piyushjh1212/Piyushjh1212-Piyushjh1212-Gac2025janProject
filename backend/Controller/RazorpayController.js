import crypto from "crypto";
import orderModel from "../Modals/OrderModals.js";
import Razorpay from "razorpay";
import My_ProductsModel from "../Modals/My_CoursesModals.js";


//  Create Raxorpay Order
export const CreateRazorPayOrder = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not Authenticated" });

    const { productId, PromoCode } = req.body;
    const Product = await My_ProductsModel.findById(productId);
    if (!Product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    let amount = Product.NewPrice ?? Product.price;

    if (PromoCode?.toUpperCase() === "SAVE20") {
      amount = amount * 0.8;
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });


    const order = await razorpay.orders.create(options);
    if (!order)
      return res 
        .status(500)
        .json({ success: false, message: "Razorpay order creation failed" });

    // Save to DB for later verification
    await orderModel.create({
      userId: userId,
      courseId: Product._id,
      razorpayOrderId: order.id,
      amount,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay Order:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// VerifyRazorpay Order
export const verifyRazorPayOrder = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

      console.log("correct",req.body);

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find order in Database
    const order = await orderModel.findOne({
      razorpayOrderId: razorpay_order_id,
    });
    
    if (!order) {
      console.log(razorpay_order_id)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.payment) {
      return res.status(400).json({
        success: false,
        message: "Payment already verified",
      });
    }

    // Create expected signature using Razorpay secret
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest("hex");

    if (generated_signature === razorpay_signature) {
      order.payment = true;
      order.razorpayPaymentId = razorpay_payment_id;
      order.razorpaySignature = razorpay_signature;
      order.status = "success";
      await order.save();

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: Signature mismatch",
      });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// ------------------------- /\ Completed /\ ----------------------------  
//                           \/           \/