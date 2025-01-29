import express, { Router } from 'express';
import { createProductController, deleteProductImageController, getAllProductController, getSingleProductController, updateProductController, updateProductImageController } from '../controllers/productController.js';
import { isAuth } from '../middlewares/AutheMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';
const productRouter = express.Router();

// routes
productRouter.get('/get-all', getAllProductController);

// get single product
productRouter.get('/:id', getSingleProductController);

// create product
productRouter.post('/create', isAuth, singleUpload, createProductController)

// update product
productRouter.put('/update/:id', isAuth, updateProductController)

// update product image 
productRouter.put('/upd-img/:id', isAuth, singleUpload, updateProductImageController);

// delete product image
productRouter.delete('/delete/:id', isAuth, singleUpload, deleteProductImageController)
export default productRouter;