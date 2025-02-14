import express from "express";
import multer from "multer";
import {
  deleteVideoController,
  getVideoController,
  uploadVideoController,
} from "../controllers/Videocontroller";

const VideoRouter = express.Router();

// Configure Multer to use memory storage
const storage = multer.memoryStorage();

const upload = multer({ storage });

VideoRouter.post("/upload", upload.single("Video"), uploadVideoController);
VideoRouter.get("/Video", getVideoController);
VideoRouter.post("/delete", deleteVideoController);
console.log(uploadVideoController);

export default VideoRouter;
