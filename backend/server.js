import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import connectDB from "./dbConfig/Db.config.js";
import UserRoutes from "./Routes/UserRoutes.js";
import My_Products_Routes from "./Routes/My_ProductsRoutes.js";
import CoursesRoutes from "./Routes/CoursesRoutes.js";
import cookieParser from "cookie-parser";
import razorPayRouter from "./Routes/RazorpayRoutes.js";


dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15minute
  max: 100,
  message: JSON.stringify({
    success: false,
    message: "Too many attempts, please try after 15 minutes",
  }),
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headerds
  legacyHeaders: false,
});

connectDB();
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); 
app.use(limiter);

app.use("/api/v1/users", UserRoutes);
app.use("/api/V1/Course", CoursesRoutes);
app.use("/api/v1/my_courses", My_Products_Routes);
app.use("/api/v1/razorpay", razorPayRouter);

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Server up!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
