import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import connectDB from "./dbConfig/Db.config.js";
import UserRoutes from "./Routes/UserRoutes.js";
import CoursesRoutes from "./Routes/ContactRoutes.js";
import My_Products_Routes from "./Routes/My_ProductsRoutes.js";



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
app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/Courses", CoursesRoutes);
app.use("/api/v1/My%@Courses__DatabaseModel", My_Products_Routes); 

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Server up!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
