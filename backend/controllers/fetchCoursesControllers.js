import orderModel from "../models/orderModel.js";
import Payment from "../models/Paymentmodel.js";
import productModel from "../models/productModel.js";

export const fetchUserCourse = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    // Fetch user payments that have a successful status
    const userPayments = await Payment.find({ userId, paymentStatus: "Success" });

    if (userPayments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No purchased courses found for this user.",
      });
    }

    // Extract course IDs
    const courseIds = userPayments.map((item) => item.courseId);

    // Fetch course details in a single query
    const userCourses = await productModel.find({ _id: { $in: courseIds } });

    console.log(userCourses);

    return res.status(200).json({
      success: true,
      message: "User courses fetched successfully",
      data: userCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
