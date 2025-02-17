import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js"

// create category
export const createCategoryController = async (req, res) => {
    try {
        const { category } = req.body;
        console.log(category)
        if (!category) {
            return res.status(500).send({
                success: false,
                message: 'Category is required'
            });
        }

        await categoryModel.create({ category });
        res.status(201).send({
            success: true,
            message: `${category} category Created Successfully!`
        });

    } catch (error) {
        console.error('Error creating category:', error.message);
        return res.status(500).send({
            success: false,
            message: 'Problem in category API'
        });
    }

}

// get all category controller 

export const getAllcategoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});

        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "Categories not found"
            })
        }

        res.status(200).send({
            success: true,
            message: "All Category Fetched Successfully",
            totalCategories: categories.length,
            categories
        })
        // const cat = categories;
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'problem in get all category api'
        })
    }
}

// delete category router

export const deleteCategoryController = async (req, res) => {
    try {
        // find category
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }

        // fond product with this id
        const products = await productModel.find({ category: category._id });
        // update product category
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            products.category = undefined;
            await products.save();
        }

        await category.deleteOne();
        res.status(200).send({
            success: true,
            message: 'category deleted successfully'
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

// update

export const updateCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        // console.log(category)
        if (!category) {
            return res.status(404).send({
                success: false,
                message: 'Category not found'
            })
        }

        // fond product with this id
        const products = await productModel.find({ category: category._id });
        // console.log(products);
        
        // update product category
        const { updateCategory } = req.body;
        console.log(updateCategory)
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            product.Category = updateCategory;
            await product.save();
        }

        if(updateCategory) category.category = updateCategory;
        console.log(updateCategory);

        await category.save({category: updateCategory});
        res.status(200).send({
            success: true,
            message: 'category updated successfully'
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
            message: "error in update product image API"
        })
    }
}