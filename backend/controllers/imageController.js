import cloudinary from "cloudinary";
import imageModel from "../models/imageModel.js";
import multer from "multer";  // For handling file uploads

const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({ storage: storage }).single("image");  // Handle single image upload

// API route to handle image upload
export const uploadImageController = (req, res) => {
    console.log("hello")
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", error: err });
    }

    try {
      // If no file uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const file = req.file.buffer;
      console.log(file);

      // Upload the image to Cloudinary
      const result = await cloudinary.v2.uploader.upload(file, {
        folder: "my_folder",  // You can specify a folder in Cloudinary
      });

      // Save the uploaded image's details to your database (MongoDB in this case)
      const savedImage = await imageModel.create({
        name: result.original_filename,
        url: result.secure_url,
        public_id: result.public_id,  // Store public_id to delete later if needed
      });

      // Respond with success
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: savedImage,
      });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Error uploading image", error });
    }
  });
};
