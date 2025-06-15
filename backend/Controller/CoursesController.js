import CourseItem from "../Modals/CoursesModals.js";

// POST: /api/course-item
export const AddCourses = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    // Optional: Validate required fields
    if (!title || !description || !image) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Set a default CourseId (manually or dynamically)
    // const defaultCourseId = "6645a1cba91bd12d18d7b941"; // replace with actual ObjectId

    const newItem = new CourseItem({
      CourseId: defaultCourseId,
      title,
      description,
      image,
    });

    await newItem.save();

    res.status(201).json({ message: "Course item created", data: newItem });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const courses = await CourseItem.find();
    if (!courses) {
      return res.json({
        success: false,
        message: "Course not found",
      });
    }

    return res.json({
        success: true,
        message: "Course fetched successfully",
        data: courses,
      });
  } catch (error) {
    return res.json({
      success: false,
      message: `You got api ${error.name} : ${error.message}.`,
    });
  }
};
