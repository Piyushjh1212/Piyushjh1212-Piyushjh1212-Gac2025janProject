// models/productModel.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    mainCourseId: {
      type: String,
      required: true
    },
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
        type: String,
        ref: 'category'
    },
    images: [
        {
            public_id: String,
            url: String,
        }
    ]
}, { timestamps: true });

// Exporting three separate models with the same schema
const ProductDb1 = mongoose.models.ProductDb1 || mongoose.model("ProductDb1", productSchema, "productsDb1");
const ProductDb2 = mongoose.models.ProductDb2 || mongoose.model("ProductDb2", productSchema, "productsDb2");
const ProductDb3 = mongoose.models.ProductDb3 || mongoose.model("ProductDb3", productSchema, "productsDb3");

export { ProductDb1, ProductDb2, ProductDb3 };
