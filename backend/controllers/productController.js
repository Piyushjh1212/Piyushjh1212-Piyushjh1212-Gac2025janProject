// GET ALL PRODUCT CONTROLLER
import cloudinary from 'cloudinary';
import mongoose from 'mongoose'
import productModel from "../models/productModel.js";
// import userModel from "../models/userModel.js";
import getDataUri from "../utils/features.js";

export const getAllProductController = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).send({
            success: true,
            message: "all products fetched successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all products api",
            error
        })
    }
}



export const getSingleProductController = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format",
            });
        }

        const singleProduct = await productModel.findById(id);

        if (!singleProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Single product found successfully",
            singleProduct,
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};



// create product

export const createProductController = async (req, res) => {
    console.log("Received Product Data:", req.body);


    try {
        const { name, description, discounted, price, NewPrice, category, images } = req.body;

        // Validate required fields
        if (!name || !description || !discounted || !price || !NewPrice || !category) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required product fields.'
            });
        }

        // Ensure images array is provided
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'Please provide at least one product image.'
            });
        }

        // Create the product in MongoDB
        const newProduct = await productModel.create({
            name,
            description,
            discounted,
            price,
            category,
            NewPrice,
            images: images.map((url) => ({ public_id: '', url })), // Store images properly
        });

        console.log("Product Created:", newProduct);

        return res.status(201).send({
            success: true,
            message: 'Product created successfully.',
            product: newProduct
        });

    } catch (error) {
        console.error("Error Creating Product:", error);
        return res.status(500).send({
            success: false,
            message: 'An error occurred while creating the product.'
        });
    }
};



export const updateProductController = async (req, res) => {

    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(500).send({
                success: false,
                message: 'Product Not Found'
            })
        }
        const { name,discounted, description, price, NewPrice, Category } = req.body;
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (NewPrice) product.NewPrice = NewPrice;
        if (Category) product.Category = Category;
        if (discounted) product.discounted = discounted;
        // console.log(product);
        await product.save();
        res.status(200).send({
            success: true,
            message: 'product updated successfully'
        })

    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(500).send({
                success: false,
                message: 'Cast Error You should resolve product id in params'
            })
        }
        return res.status(500).send({
            success: false,
            message: "error in update product api"
        })
    }

}

// updating product image

export const updateProductImageController = async (req, res) => {
    try {
          const product = await productModel.findById(req.params.id);
          if(!product) {
            return res.status(404).send({
                success: false,
                message: 'product not found'
            })
          }

          if(!req.file) {
            return res.status(404).send({
                success: false,
                message: 'product file not found'
            })
          }

        const file = getDataUri(req.file);
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }

        product.images.push(image);
        await product.save();

        res.status(200).send({
            success: true,
            message: "product image updated successfully"
        });

    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(500).send({
                success: false,
                message: 'Cast Error You should resolve product id in params'
            })
        }
        return res.status(500).send({
            success: false,
            message: "error in update product api"
        })
    }
}

// delete product image

export const deleteProductImageController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id)
        // validation
        if(!product) {
            return res.status(404).send({
                success: false,
                message: 'product not found'
            })
        }
     for(let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
     }

     await product.deleteOne()
     res.status(200).send({
        success: true,
        message: 'Product deleted successfully'
     })
    } catch (error) {
        console.log(error);
        if (error.name === 'CastError') {
            return res.status(500).send({
                success: false,
                message: 'Invalid id'
            })
        }
        return res.status(500).send({
            success: false,
            message: "error in get delete product image api"
        })
    }
}