import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import adminUserRouter from "./routes/adminUserRoutes.js";
import pdfRoutes from "./routes/PdfRoute.js"
import paymentRouter from "./routes/Paymentroutes.js"; 
import fetchcourseRouter from "./routes/fetchCoursesroutes.js";
import vRouter from "./routes/vUplRoutes.js";
import courseVideoRouter from "./routes/courseVideoRouter.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Support form data
app.use(express.urlencoded({ extended: true })); 


// Environment variables
const port = process.env.PORT || 5000;
const mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudApiKey = process.env.CLOUDINARY_API_KEY;
const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;

console.log("cloudName", cloudName);
console.log("cloudApiKey", cloudApiKey);
console.log("cloudApiSecret", cloudApiSecret);

// Database Connection
connectDB(mongo_url);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/admin-user", adminUserRouter);
app.use('/api', pdfRoutes);
app.use("/api/v1/payment", paymentRouter);
app.use('/api/v1/courses', fetchcourseRouter);
app.use("/api/v1/images", imageRouter);

// VedioUpload Api

app.use("/api/v1/video", vRouter);
app.use("/api/v1/course-video", courseVideoRouter);

app.get("/", (req, res) => {
  return res.status(201).send({
    success: true,
    message: `Hello world.`,
  });
});

// Start Server
app.listen(port, () => {
  console.log(
    `🚀 Server is running on port ${port} in ${
      process.env.NODE_ENV || "development"
    } mode.`
  );
});
