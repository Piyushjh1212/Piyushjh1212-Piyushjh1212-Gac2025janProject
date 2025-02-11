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

    // Fetch user courses based on the userId
    const userCourses = await Payment.find({ userId });

    // If no courses are found, return an appropriate message
    if (userCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this user.",
      });
    }

    // Use Promise.all to fetch all course details in parallel
    const userProductPromises = userCourses.map(async (item) => {
      const courseId = item.courseId;
      const courseData = await productModel.findById(courseId);
      return courseData; // Return the course data
    });

    // Wait for all promises to resolve
    const userProduct = await Promise.all(userProductPromises);

    console.log(userProduct);

    // Return the user courses data along with the course details
    return res.status(200).json({
      success: true,
      message: "User courses fetched successfully",
      data: userCourses,
      userProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
