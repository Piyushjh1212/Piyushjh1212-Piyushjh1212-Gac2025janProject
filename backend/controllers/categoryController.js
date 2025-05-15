import categoryModel from "../models/categoryModel.js";
import { ProductDb1, ProductDb2, ProductDb3 } from "../models/ProductDbmodle.js";

// Utility to get all product models
const allProductDbs = [ProductDb1, ProductDb2, ProductDb3];

// CREATE CATEGORY
export const createCategoryController = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category) {
            return res.status(400).send({
                success: false,
                message: 'Category is required'
            });
        }

        await categoryModel.create({ category });

        res.status(201).send({
            success: true,
            message: `${category} category created successfully!`
        });

    } catch (error) {
        console.error('Error creating category:', error.message);
        return res.status(500).send({
            success: false,
            message: 'Error in create category API'
        });
    }
};

// GET ALL CATEGORIES
export const getAllcategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if (!categories.length) {
            return res.status(404).send({
                success: false,
                message: "No categories found"
            });
        }

        res.status(200).send({
            success: true,
            message: "All categories fetched successfully",
            totalCategories: categories.length,
            categories
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in get all category API'
        });
    }
};

// DELETE CATEGORY
export const deleteCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }

        for (const db of allProductDbs) {
            const products = await db.find({ Category: category._id });
            for (const product of products) {
                product.Category = undefined;
                await product.save();
            }
        }

        await category.deleteOne();

        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        });

    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).send({
                success: false,
                message: 'Invalid category ID'
            });
        }
        return res.status(500).send({
            success: false,
            message: 'Error in delete category API'
        });
    }
};

// UPDATE CATEGORY
export const updateCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }

        const { updateCategory } = req.body;
        if (!updateCategory) {
            return res.status(400).send({
                success: false,
                message: 'Updated category name is required'
            });
        }

        for (const db of allProductDbs) {
            const products = await db.find({ Category: category._id });
            for (const product of products) {
                product.Category = category._id;
                await product.save();
            }
        }

        category.category = updateCategory;
        await category.save();

        res.status(200).send({
            success: true,
            message: 'Category updated successfully'
        });

    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).send({
                success: false,
                message: 'Invalid category ID'
            });
        }
        return res.status(500).send({
            success: false,
            message: 'Error in update category API'
        });
    }
};
