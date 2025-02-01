import imageModel from "../models/imageModel.js";
import cloudinary from "../config/cloudinarySetup.js"; // ✅ Ensure Cloudinary is imported

export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mern-uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer); // Upload buffer to Cloudinary
    });

    // ✅ Save image details in MongoDB
    const savedImage = await imageModel.create({
      imageUrl: result.secure_url,
      imageId: result.public_id
    });

    res.status(200).json({ message: "Image uploaded successfully!", savedImage });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
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
