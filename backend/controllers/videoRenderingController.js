import videoRenderingModel from "../models/videoRenderingModel.js";

const createVideoRenderingController = async (req, res) => {
  try {
    const { title, description, vsubTitle, vUrl } = req.body;

    if (!vsubTitle || !vUrl) {
      return res.status(400).json({
        success: false,
        message: "vsubTitle and vUrl are required",
      });
    }

    let courseVideo = await videoRenderingModel.findOne({ title });

    if (!courseVideo) {
      // If no course with this title exists, create a new one
      courseVideo = await videoRenderingModel.create({
        title,
        description,
        subTitle: [{ vsubTitle, vUrl }],
      });
    } else {
      // If course exists, update and push new subTitle
      courseVideo = await videoRenderingModel.findOneAndUpdate(
        { title },
        { $push: { subTitle: { vsubTitle, vUrl } } },
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

export default createVideoRenderingController;
