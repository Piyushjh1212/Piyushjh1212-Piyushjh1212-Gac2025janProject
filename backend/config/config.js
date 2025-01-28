import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Ensure this is correctly defined in your .env file
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    
    // Connect to MongoDB without deprecated options
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
