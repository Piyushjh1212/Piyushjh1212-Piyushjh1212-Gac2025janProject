// src/controllers/CoursesController.js

import Course from "../models/CoursesDbmodal.js";

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

// @desc    Get a single course by ID
// @route   GET /api/v1/courses/courses/:id
// @access  Public
export const getCourseById = async (req, res) => {
  console.log(req.params);
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ success: true, course });
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

// @desc    Update a course
// @route   PUT /api/v1/courses/courses/:id
// @access  Admin (if needed)
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, link } = req.body;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.image = image || course.image;
    course.link = link || course.link;

    await course.save();

    res.status(200).json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Failed to update course", error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/v1/courses/courses/:id
// @access  Admin (if needed)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course", error: error.message });
  }
};
