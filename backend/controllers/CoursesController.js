import Course from "../models/CoursesModel.js";

// @desc    Get all courses
// @route   GET /api/v1/courses/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/v1/courses/courses
// @access  Public or Admin
export const createCourse = async (req, res) => {
  try {
    const { title, description, image, link } = req.body;

    // Validation
    if (!title || !description || !image || !link) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newCourse = new Course({ title, description, image, link });
    await newCourse.save();

    res.status(201).json({
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add course", error: error.message });
  }
};

/* 
// @desc    Update a course (optional future use)
// @route   PUT /api/v1/courses/courses/:id
export const updateCourse = async (req, res) => {
  // ...
};

// @desc    Delete a course (optional future use)
// @route   DELETE /api/v1/courses/courses/:id
export const deleteCourse = async (req, res) => {
  // ...
};
*/
