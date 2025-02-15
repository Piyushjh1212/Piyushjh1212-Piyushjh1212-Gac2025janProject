import express from "express";
import { upload } from "../middlewares/videoUploads.js";
import { videoUploadController } from "../controllers/vUplController.js";

const videoUploadRouter = express.Router();

// Log route setup for debugging
videoUploadRouter.use((req, res, next) => {
  console.log("Request received at:", req.originalUrl);
  console.log("Method:", req.method);                  
  next();  
});

// Video upload route
videoUploadRouter.post("/upload/:videoId", upload.single("video"), videoUploadController);


// Log router details (this will log the internal structure)
console.log(videoUploadRouter.stack); // Logs stack details, including paths and middleware

export default videoUploadRouter;
