import VideoModel from "../models/Videomodel.js";
import cloudinary from "../config/cloudinarySetup.js";
import multer from "multer";

// Multer configuration for memory storage (buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("Vedio");

export const uploadVideoController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      // ✅ Upload Video to Cloudinary using a Promise
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "mern-uploads" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(req.file.buffer);
      });

      // ✅ Save Video details in MongoDB
      const savedVideo = await VideoModel.create({
        VideoUrl: result.secure_url,
        VideoId: result.public_id,
      });

      res
        .status(200)
        .json({ message: "Video uploaded successfully!", savedVideo });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ message: "Video upload failed", error });
    }
  });
};

export const getVideoController = async (req, res) => {
  try {
    const Videos = await VideoModel.find().select("VideoUrl VideoId");

    if (!Videos.length) {
      return res.status(404).json({ message: "No Videos found" });
    }

    res.status(200).json(Videos);
  } catch (error) {
    console.error("Error fetching Videos:", error);
    res.status(500).json({ message: "Error fetching Videos", error });
  }
};

export const deleteVideoController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Video ID is required" });
    }

    const Video = await VideoModel.findById(id);
    if (!Video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // ✅ Delete from Cloudinary
    await cloudinary.uploader.destroy(Video.VideoId);

    // ✅ Delete from database
    await VideoModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting Video:", error);
    res.status(500).json({ message: "Video deletion failed", error });
  }
};
