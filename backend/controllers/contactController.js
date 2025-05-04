import validator from 'validator';  // npm install validator
import sanitizeHtml from 'sanitize-html';  // npm install sanitize-html
import contactModel from "../models/contactModel.js";           

export const contactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate the input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Sanitize the input
    const sanitizedMessage = sanitizeHtml(message);

    // Save the contact message to the database
    const newContact = await contactModel.create({
      name,
      email,
      message: sanitizedMessage,
    });

    res.status(201).json({ message: "Message sent successfully", data: newContact });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};



// fetch data from backend for adminpanel

export const getContactController = async (req, res) => {
  try {
    const contacts = await contactModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}