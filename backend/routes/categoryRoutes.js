import express from 'express';
// import { Router } from 'express';
import { isAuth } from '../middlewares/AutheMiddleware.js';
import { createCategoryController, deleteCategoryController, getAllcategoryController, updateCategoryController } from '../controllers/categoryController.js';

const categoryRouter = express.Router()
.post('/create', isAuth, createCategoryController)
.delete('/delete/:id', isAuth, deleteCategoryController)
.get('/get-all', getAllcategoryController)
.put('/update/:id', isAuth, updateCategoryController)

export default categoryRouter;
// create category

// getAll category

// delete category

// update category