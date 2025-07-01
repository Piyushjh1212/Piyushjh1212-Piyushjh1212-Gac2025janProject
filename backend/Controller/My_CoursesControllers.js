import mongoose from "mongoose";

// import cloudinary from "cloudinary";
// import getDataUri from "../utils/features.js";

import My_ProductsModel from "../Modals/My_CoursesModals.js";

// CREATE PRODUCT CONTROLLER
export const createProductController = async (req, res) => {


  try {
    const { name, price, NewPrice, description, images, mainProductId } =
      req.body;

    if (
      !name ||
      !price ||
      !NewPrice ||
      !description ||
      !images ||
      !mainProductId 
        ) {
      return res.status(300).json({
        success: false,
        message: `All fields are required`,
      });
    }

    if (
      isNaN(Number(price)) ||
      price <= 0 ||
      isNaN(Number(NewPrice)) ||
      NewPrice <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price should be a number greater than 0",
      });
    }

    const newProduct = await My_ProductsModel.create({
      name,
      price,
      NewPrice,
      description,
      images,
      mainProductId,
    });

    if (!newProduct) {
      return res.status(500).json({
        success: false,
        message: `Product not saved please try again`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Product saved successfully`,
    });
  } catch (error) {
    console.error(" Error creating product:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while creating the product.",
      error: error.message,
    });
  }
};

// Error Handler Function
const handleError = (res, message, error = null, status = 500) => {
  console.error(`[${new Date().toISOString()}] ${message}:`, error);
  return res.status(status).send({
    success: false,
    message,
    error: error ? error.message : null,
  });
};

export const getSingleProductController = async (req, res) => {
  try {
    let { dbCategory, id } = req.params;
    console.log(id);

    const getSingleProduct = await My_ProductsModel.find({
      mainProductId: id,
    });
    console.log(getSingleProduct);

    if (!getSingleProduct) {
      res.status(404).json({
        success: false,
        message: `Product with ${id} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: getSingleProduct,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

// UPDATE PRODUCT CONTROLLER
export const updateProductController = async (req, res) => {
  try {
    const { id, dbCategory } = req.params;

    // Validate dbCategory
    const ProductModel = getProductModelByCategory(dbCategory);
    if (!ProductModel) {
      return res.status(400).send({
        success: false,
        message: `Invalid dbCategory '${dbCategory}' provided.`,
      });
    }

    // Validate id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product Not Found",
      });
    }

    const { name, discounted, description, price, NewPrice, Category } =
      req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (NewPrice) product.NewPrice = NewPrice;
    if (Category) product.Category = Category;
    if (discounted !== undefined) product.discounted = discounted;

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return handleError(res, "Error in update product API", error);
  }
};

// UPDATE PRODUCT IMAGE CONTROLLER
export const updateProductImageController = async (req, res) => {
  try {
    const { id, dbCategory } = req.params;

    // Validate dbCategory
    const ProductModel = getProductModelByCategory(dbCategory);
    if (!ProductModel) {
      return res.status(400).send({
        success: false,
        message: `Invalid dbCategory '${dbCategory}' provided.`,
      });
    }

    // Validate id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "Product file not found",
      });
    }

    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };

    product.images.push(image);
    await product.save();

    res.status(200).send({
      success: true,
      message: "Product image updated successfully",
      product,
    });
  } catch (error) {
    return handleError(res, "Error in update product image API", error);
  }
};

// DELETE PRODUCT IMAGE CONTROLLER
export const deleteProductImageController = async (req, res) => {
  try {
    const { id, dbCategory } = req.params;

    // Validate dbCategory
    const ProductModel = getProductModelByCategory(dbCategory);
    if (!ProductModel) {
      return res.status(400).send({
        success: false,
        message: `Invalid dbCategory '${dbCategory}' provided.`,
      });
    }

    // Validate id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Delete all images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      if (product.images[i].public_id) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
    }

    // Delete product itself
    await product.deleteOne();

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return handleError(res, "Error in delete product image API", error);
  }
};
