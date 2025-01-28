import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/config.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Adds security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming requests

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/user', userRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
