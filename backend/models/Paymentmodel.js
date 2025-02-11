import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {type: String, required: true},
    courseId: {type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: {type: String, default: null},
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, required: true, unique: true, index: true },
    paymentStatus: { 
      type: String, 
      enum: ["Pending", "Success", "Failed"], 
      default: "Pending" 
    },
    paymentDate: { type: Date, default: Date.now },
    paymentResponse: { type: Object }, // Optional: Store full payment response
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
