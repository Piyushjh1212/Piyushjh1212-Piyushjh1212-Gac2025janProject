import express from 'express';
import { uploadImageController } from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/upload', uploadImageController);

export default imageRouter;