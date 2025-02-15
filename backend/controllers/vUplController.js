import { uploadToCloudinary } from "../middlewares/videoUploads.js";

export const videoUploadController = async (req, res) => {
  try {
    // 🛑 Check if no file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded. Please select a video file." });
    }

    console.log("Uploading file:", req.file.path); // ✅ Debugging log

    // ✅ Upload the video to Cloudinary
    const videoUrl = await uploadToCloudinary(req.file.path);

    console.log("✅ Uploaded Video URL:", videoUrl); // ✅ Debugging log

    // ✅ Send a successful response
    res.status(200).json({
      message: "Video uploaded successfully",
      videoUrl,
    });
  } catch (error) {
    console.error("❌ Video Upload Error:", error.message);

    // ✅ Handle specific Cloudinary errors
    if (error.message.includes("Failed to upload video to Cloudinary")) {
      return res.status(500).json({ error: "Cloudinary upload failed. Please try again later." });
    }

    // ✅ General error response
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
};
