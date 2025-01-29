// GET ALL PRODUCT CONTROLLER
import cloudinary from 'cloudinary';
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
        const singleProduct = await productModel.findById(req.params.id);
        // validation 
        if (!singleProduct) {
            return res.status(500).send({
                success: false,
                message: "single product not found",
            })
        }

        res.status(200).send({
            success: true,
            message: "Single product found Successfully",
            singleProduct
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(500).send({
                success: false,
                message: 'Cast Error You should resolve product id in params'
            })
        }
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'single product api error not found'
        })
    }
}


// create product

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, stock, Category } = req.body;

        // Validate fields
        if (!name || !description || !price || !stock) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required product fields.'
            });
        }

        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'You should upload product images.'
            });
        }

        const file = getDataUri(req.file);
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        const image = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        };

        const insertedProduct = await productModel.create({
            name, description, price, Category, stock, images: [image]
        });

        console.log(insertedProduct);

        return res.status(201).send({
            success: true,
            message: 'Product created successfully.',
            product: insertedProduct // Optional: return the created product data
        });
    } catch (error) {
        console.error(error); // Use console.error for error logging
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
        const { name, description, price, stock, Category } = req.body;
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (Category) product.Category = Category;
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