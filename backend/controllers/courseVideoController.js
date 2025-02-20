import courseVideoModel from "../models/courseVideoModel.js";

export const uploadCourseVideoController = async (req, res) => {
  try {
    const { selectedTopic, selectedSubTopic, selectedVideo, subTitle } = req.body;

    // Validate required fields
    if (!selectedTopic || !selectedSubTopic || !selectedVideo || !subTitle) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Create new video entry
    const newCourseVideo = await courseVideoModel.create({
      topic: selectedTopic,
      subTopic: selectedSubTopic,
      videoUrl: selectedVideo,
      description: subTitle,
    });

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully!",
      data: newCourseVideo,
    });

  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};

export const getAllCourseVideoController = async (req, res) => {
  try {
    const data = await courseVideoModel.find();

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No course videos found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All course videos fetched successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message, // Include the error message for debugging
    });
  }
};


export default uploadCourseVideoController;
