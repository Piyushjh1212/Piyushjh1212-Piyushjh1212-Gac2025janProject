import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    NewPrice: {
        type: Number,
        required: [true, 'stock is required']
    },
    discounted: {
        type: String,
        required: [true, 'description is required']
    },

    description: {
        type: String,
        required: [true, 'description is required']
    },   
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    images: [
        {
            public_id: String,
            url: String,
        }
    ]

}, {timestamps: true});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;