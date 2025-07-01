// controllers/courseVideoController.js

import CourseVideo from "../Modals/LearnCoursesModals.js";


// @desc Add a new course video
export const addLearnCourseVideoController = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      difficulty,
      type,
      videoUrl,
      thumbnail,
      studentsCount,
      rating,
      estimatedTime,
      nextLesson,
      keyPoints,
    } = req.body;

    if (
      !title ||
      !description ||
      !duration ||
      !difficulty ||
      !type ||
      !videoUrl ||
      !thumbnail ||
      !studentsCount ||
      rating == null ||
      !estimatedTime ||
      !nextLesson ||
      !keyPoints?.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newVideo = new CourseVideo({
      title,
      description,
      duration,
      difficulty,
      type,
      videoUrl,
      thumbnail,
      studentsCount,
      rating,
      estimatedTime,
      nextLesson,
      keyPoints,
    });

    await newVideo.save();

    res.status(201).json({
      success: true,
      message: "Course video added successfully",
      data: newVideo,
    });
  } catch (error) {
    console.error("Error adding course video:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
