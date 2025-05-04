import CourseItemModel from "../models/courseItemModel.js";

export const createCourseItem = async (req, res) => {
  try {
    const { productId, title, description, imageUrl, link } = req.body;

    console.log(req.body);

    if (!productId || !title || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const newCourseItem = await CourseItemModel.create({
      productId,
      title,
      description,
      imageUrl,
      link,
    });

    if (!newCourseItem)
      return res.status(400).json({
        success: false,
        message: "Course item not created.",
      });

    return res.status(200).json({
      success: true,
      message: "Product created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Api error in course item creation",
    });
  }
};
