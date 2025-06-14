import express from "express";
import { getAllProductController, getSingleProductController } from "../Controller/My_CoursesControllers.js";

// import { singleUpload } from "../middlewares/multer.js";

const My_Products_Routes = express.Router();

// Get all products of a specific category (optional)
My_Products_Routes.get("/get-all/:dbCategory", getAllProductController);

// Get single product by category and id
My_Products_Routes.get("/My_Products/:dbCategory/:id", getSingleProductController);

// Create product (NO isAuth)
// DifferentCategoryRouter.post("/Different_Database_Modle/create", createProductController);

// // Update product
// DifferentCategoryRouter.put("/update/:dbCategory/:id", updateProductController);

// Update product image
// DifferentCategoryRouter.put(
//   "/upd-img/:dbCategory/:id",
//   singleUpload,
//   updateProductImageController
// );

// // Delete product image
// DifferentCategoryRouter.delete(
//   "/delete/:dbCategory/:id",
//   singleUpload,
//   deleteProductImageController
// );

export default My_Products_Routes;
