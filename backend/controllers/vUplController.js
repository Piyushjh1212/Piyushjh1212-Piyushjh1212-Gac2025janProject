import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cloudinary from "../config/vCloudinary.js";
import Video from "../models/vUplModel.js";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload Video Controller
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get the uploaded file path
    const filePath = path.join(__dirname, "../uploads/", req.file.filename);

    // Upload video to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "videos",
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    // Save video details to MongoDB
    const newVideo = new Video({
      title: req.body.title,
      url: result.secure_url,
    });
    await newVideo.save();

    return res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    return res.status(201).json({
       success: true,
       message: `Videos fetched successfully`,
       videos
    })
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
