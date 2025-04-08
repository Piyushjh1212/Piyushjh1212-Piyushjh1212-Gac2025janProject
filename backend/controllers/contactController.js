import contactModel from "../models/contactModel.js";

export const contactController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate the input
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the contact message to the database
    const newContact = await contactModel.create({
      name,
      email,
      message,
    });

    res
      .status(201)
      .json({ message: "Message sent successfully", data: newContact });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
