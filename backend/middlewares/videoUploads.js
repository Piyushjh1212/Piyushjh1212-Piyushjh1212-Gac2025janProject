import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

// Ensure 'uploads/' folder exists safely
const uploadDir = path.join(process.cwd(), "uploads"); // Ensures correct path
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage (Temporary Local Storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer Upload Configuration
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4", "video/mkv", "video/avi", "video/mov"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only MP4, MKV, AVI, and MOV video files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Function to Upload Video to Cloudinary
const uploadToCloudinary = async (filePath) => {
  try {
    // Check if file exists before uploading
    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist");
    }

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video",
      folder: "videos",
    });

    // Delete the local file only if upload is successful
    if (result.secure_url) {
      fs.unlinkSync(filePath);
    }

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);

    // Ensure local file is deleted even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw new Error("Failed to upload video to Cloudinary");
  }
};

export { upload, uploadToCloudinary };
