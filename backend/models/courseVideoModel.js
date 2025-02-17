import mongoose from "mongoose";

// Define schema for course videos
const courseVideoSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  subTopic: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create or retrieve the CourseVideo model
const courseVideoModel =
  mongoose.models.CourseVideo ||
  mongoose.model("CourseVideo", courseVideoSchema);

export default courseVideoModel;
