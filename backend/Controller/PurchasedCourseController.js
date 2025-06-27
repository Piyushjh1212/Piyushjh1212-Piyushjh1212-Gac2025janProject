import My_ProductsModel from "../Modals/My_CoursesModals.js";
import orderModel from "../Modals/OrderModals.js";


export const PurchasedCourseController = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found",
      });
    }

    // 1. Get successful orders for the user
    const userPayments = await orderModel.find({
      userId,
      status: "success",
    });

    if (!userPayments || userPayments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No purchased courses found for this user.",
      });
    }

    // 2. Extract courseIds from successful orders
    const courseIds = userPayments.map((order) => order.courseId).filter(Boolean);

    if (courseIds.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No valid course IDs found in purchased orders.",
      });
    }

    // 3. Fetch course details from your products model
    const courses = await My_ProductsModel.find({ _id: { $in: courseIds } });

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Purchased course data not found in products.",
      });
    }

    // 4. Send back the course details
    return res.status(200).json({
      success: true,
      message: "User courses fetched successfully",
      data: courses,
    });

  } catch (error) {
    console.error("Error fetching user courses:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
