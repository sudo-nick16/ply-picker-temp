import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema

const ProductSchema = new mongoose.Schema(
    {
        plyid: {
            type: String,
            required: true,
        },
        catagory: {
            type: ObjectId,
            ref:"Category"
        },
        subcatagory: {
            type: ObjectId,
            ref:"SubCategory"
        },
        group: {
            type: ObjectId,
            ref:"Group"
        },
        subgroup: {
            type: ObjectId,
            ref:"SubGroup"
        },
        brand: {
            type: ObjectId,
            ref:"Brand"
        },
        product_name: {
            type: String,
            required: true,
        },
        product_description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discounted_price: {
            type: Number,
            required: true,
        },
        rating_and_review: {
          type: Array,
          required: true,
        },

        attrs: {
            type: Object,
        },
        tags: {
            type: Array,
            default: [],
            required: true,
        },
        filters: {
            type: Array,
            default: [],
            required: true,
        },
        variants: {
            type: Array,
            default: [],
            required: true,
        }
    },
    { timestamps: true }
);


const Product = mongoose.model('Product', ProductSchema);

export default Product;