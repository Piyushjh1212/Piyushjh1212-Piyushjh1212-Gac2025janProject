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

export default uploadCourseVideoController;
