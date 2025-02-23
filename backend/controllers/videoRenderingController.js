import videoRenderingModel from "../models/videoRenderingModel.js";

export const createVideoRenderingController = async (req, res) => {
  // title
  // description
  // subCategory

  try {
    const { title, description, subCategory } = req.body;

    let courseVideo = await videoRenderingModel.findOne({ title });

    if (!courseVideo) {
      courseVideo = await videoRenderingModel.create({
        title,
        description,
        subCategory: [],
      });
    } else {
      courseVideo = await videoRenderingModel.findOneAndUpdate(
        { title },
        { $push: { subCategory: subCategory } },
        { new: true }
      );
    }
    return res.status(201).json({
      success: true,
      message: "Video rendering updated successfully",
      data: courseVideo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "API error",
      error: error.message,
    });
  }
};

export const getVideoRenderingController = async (req, res) => {
  try {
    const allrenderedVideo = await videoRenderingModel.find();

    if (!allrenderedVideo) {
      return res.status(400).json({
        success: false,
        message: `Videos not fetched`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `All Videos fetched successfully`,
      allrenderedVideo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Api error`,
    });
  }
};

export const updateVideoRenderingController = async (req, res) => {
  try {
    const { title, videoTopic, vUrl } = req.body;

    if (!title || !videoTopic || !vUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("Received title:", title);

    let courseVideo = await videoRenderingModel.findOne({ title });

    if (!courseVideo) {
      return res.status(404).json({
        success: false,
        message: "Course Video Not Found",
      });
    }

    courseVideo.subTitle.push({ videoTopic, vUrl });

    const updatedVideoRendering = await courseVideo.save();

    return res.status(200).json({
      success: true,
      message: "Video rendering updated successfully",
      data: updatedVideoRendering,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "API error",
      error: error.message,
    });
  }
};
