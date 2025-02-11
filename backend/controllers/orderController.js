import orderModel from "../models/orderModel.js";

export const createOrderController = async (req, res) => {
  try {
    const userId = req.user?._id;
    const {
      courseId,
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      amount,
    } = req.body;

console.log(req.body);

    // Input validation
    // if (!userId || !courseId || !firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone || !amount) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }

    if (typeof phone !== "string" || phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Create a new order instance
    const newOrder = new orderModel({
      userId,
      courseId,
      amount: 12, // You may want to make this dynamic
      address: {
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipcode,
        country,
        phone,
        amoount
      },
    });

    // Save the order to the database
    await newOrder.save();
    // console.log("New Order Created:", newOrder);
    // console.log(newOrder);
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
