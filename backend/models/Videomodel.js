import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  VideoUrl: {
    type: String,
    required: true,
  },
  VideoId: {
    type: String,
    required: true,
  },
});

const VideoModel =
  mongoose.models.Video || mongoose.model("Video", VideoSchema);
export default VideoModel;
