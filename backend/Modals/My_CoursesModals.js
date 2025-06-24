// models/productModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    mainProductId: {
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
    description: {
      type: String,
      required: [true, "description is required"],
    },
    CourseDuration: {
      type : Number,
      required : [true, "Courseduration is required"]
    },
    Lessons : {
      type: String,
      required : true
    },
    images: [{
      type: String,
      required: true,
    }],
  
  
  },
  { timestamps: true }
);

// Exporting three separate models with the same schema
const My_ProductsModel =
  mongoose.models.My_Products ||
  mongoose.model("My_Products", productSchema, "My_Products");

export default My_ProductsModel;
