import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage for buffer
export const singleUpload = multer({ storage }).single("file"); // Ensure field name is "file"
