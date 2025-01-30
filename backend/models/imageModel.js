import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  public_id: { type: String, required: true },  // Cloudinary public ID for deletion
}, { timestamps: true });

const imageModel = mongoose.model("Image", imageSchema);
export default imageModel;
