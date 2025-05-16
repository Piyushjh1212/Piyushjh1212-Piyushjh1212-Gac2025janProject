import mongoose from "mongoose";
import {
  ProductDb1,
  ProductDb2,
  ProductDb3,
} from "../models/ProductDbmodle.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/features.js";

// Error Handler Function
const handleError = (res, message, error = null, status = 500) => {
  console.error(`[${new Date().toISOString()}] ${message}:`, error);
  return res.status(status).send({
    success: false,
    message,
    error: error ? error.message : null,
  });
};

// Dynamically choose the correct model based on the dbCategory
const getProductModelByCategory = (dbCategory) => {
  console.log("dbCategory in getProductModelByCategory:", `"${dbCategory}"`);

  switch (dbCategory) {
    case "db1":
    case "defaultCategory": // You mentioned 'defaultCategory' points to 'db1'
      return ProductDb1;
    case "db2":
      return ProductDb2;
    case "db3":
      return ProductDb3;
    default:
      console.warn(`Invalid dbCategory '${dbCategory}' provided.`);
      return null;
  }
};

// GET ALL PRODUCTS CONTROLLER (all DBs)
export const getAllProductController = async (req, res) => {
  try {
    const [db1Products, db2Products, db3Products] = await Promise.all([
      ProductDb1.find({}),
      ProductDb2.find({}),
      ProductDb3.find({}),
    ]);

    res.status(200).send({
      success: true,
      message: "All products from all DBs fetched successfully",
      db1: db1Products,
      db2: db2Products,
      db3: db3Products,
    });
  } catch (error) {
    return handleError(res, "Error in get all products API", error);
  }
};

// GET SINGLE PRODUCT CONTROLLER

export const getSingleProductController = async (req, res) => {
  try {
    let { dbCategory, id } = req.params;

    const ProductModel = getProductModelByCategory(dbCategory);
    if (!ProductModel) {
      return res.status(400).json({
        success: false,
        message: `Invalid dbCategory '${dbCategory}' provided.`,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // Fetch multiple products with same mainCourseId
    const products = await ProductModel.find({ mainCourseId: id });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products, // 👈 note: plural
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


// CREATE PRODUCT CONTROLLER
export const createProductController = async (req, res) => {
  console.log("Received Product Data:", req.body);

  try {
    const {
      name,
      price,
      NewPrice,
      discounted,
      description,
      Category,
      images,
      mainProductId,
      dbCategory,
    } = req.body;

    // Validate dbCategory
    const ProductModel = getProductModelByCategory(dbCategory);
    if (!ProductModel) {
      return res.status(400).send({
        success: false,
        message: `Invalid dbCategory '${dbCategory}' provided.`,
      });
    }

    // Validate required fields
    if (
      !name ||
      price === undefined ||
      NewPrice === undefined ||
      discounted === undefined ||
      !description ||
      !Category ||
      !images
    ) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required product fields.",
      });
    }

    if (isNaN(price) || isNaN(NewPrice)) {
      return res.status(400).send({
        success: false,
        message: "Price and NewPrice should be numeric values.",
      });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Please provide at least one product image.",
      });
    }

    // Create new product in the selected database
    const newProduct = await ProductModel.create({
      name,
      description,
      discounted,
      price,
      NewPrice,
      Category,
      mainCourseId: mainProductId,
      images: images.map((img) => ({
        public_id: "", // Optional if not using Cloudinary upload here
        url: img.url || img,
      })),
    });

    console.log("✅ Product Created:", newProduct);

    return res.status(201).send({
      success: true,
      message: "Product created successfully.",
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return res.status(500).send({
      success: false,
      message: "An error occurred while creating the product.",
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
