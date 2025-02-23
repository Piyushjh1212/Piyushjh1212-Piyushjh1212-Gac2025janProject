import mongoose from "mongoose";

// Define the schema for Category
const renderingVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subTitle: {
    type: Array,
    default: []
  }
});

const renderingVideoModel =
  mongoose.models.RenderVideo ||
  mongoose.model("RenderVideo", renderingVideoSchema);

export default renderingVideoModel;
