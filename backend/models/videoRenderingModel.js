import mongoose from "mongoose";

const videoRenderingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subTitle: {
    type: [
      {
        vsubTitle: {
          type: String,
          required: true,
        },
        vUrl: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const videoRenderingModel =
  mongoose.models.CourseVideos ||
  mongoose.model("CourseVideos", videoRenderingSchema);

export default videoRenderingModel;
    