import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
    amount: { type: Number, required: true },
    address: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String
    },
    status: { type: String, default: "Pending" },
    payment: { type: Boolean, default: false },
    razorpayOrder: {
      id: String, // Razorpay Order ID
      currency: String,
      amount: Number,
    },
  }, {timestamps: true});
  
  
  const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
  
  export default orderModel;
  