// models/CourseVideo.model.js
import mongoose from "mongoose";

const courseVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // e.g., "35:40"
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  type: {
    type: String,
    enum: ["Video", "Article", "Quiz"],
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  studentsCount: {
    type: String, // Stored as string like "1.6k", or change to Number if needed
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  estimatedTime: {
    type: String, // e.g., "40 min"
    required: true,
  },
  nextLesson: {
    type: String,
    required: true,
  },
  keyPoints: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
});

const CourseVideo = mongoose.model("CourseVideo", courseVideoSchema);
export default CourseVideo;
