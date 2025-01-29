import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    stock: {
        type: Number,
        required: [true, 'stock is required']
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ]

}, {timestamps: true});

const productModel = mongoose.model("Product", productSchema);
export default productModel;