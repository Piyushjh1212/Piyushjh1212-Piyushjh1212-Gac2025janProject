import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); //  Load environment variables

const cloudinarySetup = () => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error(" Cloudinary setup failed! Missing environment variables.");
    process.exit(1); // Exit the app if credentials are missing
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log(" Cloudinary configured successfully!");
};

//  Call the function immediately to configure Cloudinary
cloudinarySetup();

export default cloudinary;
