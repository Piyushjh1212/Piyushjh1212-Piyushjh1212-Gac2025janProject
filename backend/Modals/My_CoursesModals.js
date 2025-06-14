// models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    mainCourseId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "product name is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    NewPrice: {
      type: Number,
      required: [true, "stock is required"],
    },
    discounted: {
      type: String,
      required: [true, "description is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    Category: {
      type: String,
      ref: "category",
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

// Exporting three separate models with the same schema
const My_Products = mongoose.models.My_Products || mongoose.model("My_Products", productSchema, "My_Products");

export default My_Products;
