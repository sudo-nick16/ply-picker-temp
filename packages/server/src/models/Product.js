import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    variants: {
        type: [
            {
                variant_type: String,
                variant_value: String
            }
        ]
    }
});

const Product = mongoose.model("products", ProductSchema);

export default Product;