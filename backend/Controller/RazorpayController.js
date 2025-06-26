import crypto from "crypto";
import orderModel from "../Modals/OrderModals.js";
import userModel from "../Modals/userModals.js";
import Razorpay from "razorpay";
import My_ProductsModel from "../Modals/My_CoursesModals.js";

// const frontend_url = process.env.FRONTEND_URL;
// const razorPayKeyId = process.env.RAZORPAY_KEY_ID;
// const razorPayKeySecret = process.env.RAZORPAY_KEY_SECRET;

// // Create Razorpay Order
// export const createRazorPayOrderController = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

//     const { items, amount, address } = req.body;
//     if (!items || !amount || !address)
//       return res.status(400).json({ success: false, message: "All fields are required" });

//     // Save order to database
//     const savedOrder = await new orderModel({ userId, items, amount, address }).save();
//     if (!savedOrder) return res.status(500).json({ success: false, message: "Failed to save order" });

//     await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });

//     const rPI = createRazorpayInstance(razorPayKeyId, razorPayKeySecret);
//     // Create Razorpay order
//     const options = {
//       amount: Math.round(Number(amount) * 100), // Convert to paise
//       currency: "INR",
//       receipt: `receipt_order_${savedOrder._id}`,
//     };

//     const order = await rPI.orders.create(options); // Use async/await here
//     if (!order) return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
//     savedOrder.razorpayOrder = {
//       id: order.id,        // Razorpay order ID
//       currency: 'INR',     // Currency
//       amount: Math.round(Number(amount)) // Ensure amount is a rounded number
//     };
//     await savedOrder.save();

//     res.status(200).json({
//       success: true,
//       message: "Order created successfully",
//       razorpayOrder: order,
//       orderId: savedOrder._id,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
//   }
// };

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

// User Orders
export const userOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });

    const orders = await orderModel.find({ userId });
    if (!orders.length)
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });

    res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// List All Orders
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    if (!orders.length)
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });

    res
      .status(200)
      .json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update Order Status
export const UpdateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status)
      return res
        .status(400)
        .json({ success: false, message: "Order ID and status are required" });

    const UpdatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    if (!UpdatedOrder)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: UpdatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Delete the Payment Order
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId)
      return res
        .status(400)
        .json({ success: false, message: "Order ID is required" });

    const deletedOrder = await orderModel.findByIdAndDelete(orderId);
    if (!deletedOrder)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
