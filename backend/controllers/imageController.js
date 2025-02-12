import imageModel from "../models/imageModel.js";
import cloudinary from "../config/cloudinarySetup.js";
import multer from "multer";

// Multer configuration for memory storage (buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

export const uploadImageController = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: "Multer error", error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // ✅ Upload image to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: "mern-uploads" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ message: "Cloudinary upload failed", error });
          }

          // ✅ Save image details in MongoDB
          const savedImage = await imageModel.create({
            imageUrl: result.secure_url,
            imageId: result.public_id,
          });

          res.status(200).json({ message: "Image uploaded successfully!", savedImage });
        }
      );

      // Send file buffer to Cloudinary
      result.end(req.file.buffer);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Image upload failed", error });
    }
  });
};

export const getImageController = async (req, res) => {
  try {
    const images = await imageModel.find().select("imageUrl imageId");

    if (!images.length) {
      return res.status(404).json({ message: "No images found" });
    }

    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Error fetching images", error });
  }
};

export const deleteImageController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Image ID is required" });
    }

    const image = await imageModel.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // ✅ Delete from Cloudinary
    await cloudinary.uploader.destroy(image.imageId);

    // ✅ Delete from database
    await imageModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Image deletion failed", error });
  }
};
