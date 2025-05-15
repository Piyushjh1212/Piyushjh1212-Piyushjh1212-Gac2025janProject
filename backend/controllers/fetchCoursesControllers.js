import orderModel from "../models/orderModel.js";
import Payment from "../models/Paymentmodel.js";
import { ProductDb1, ProductDb2, ProductDb3 } from "../models/ProductDbmodle.js";

export const fetchUserCourse = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    // Get successful payments
    const userPayments = await Payment.find({ userId, paymentStatus: "Success" });

    if (userPayments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No purchased courses found for this user.",
      });
    }

    // Extract course IDs
    const courseIds = userPayments.map((payment) => payment.courseId);

    // Fetch courses from all product DBs
    const [courses1, courses2, courses3] = await Promise.all([
      ProductDb1.find({ _id: { $in: courseIds } }),
      ProductDb2.find({ _id: { $in: courseIds } }),
      ProductDb3.find({ _id: { $in: courseIds } }),
    ]);

    const userCourses = [...courses1, ...courses2, ...courses3];

    if (userCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Purchased course data not found in products.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User courses fetched successfully",
      data: userCourses,
    });

  } catch (error) {
    console.error("Error fetching user courses:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
