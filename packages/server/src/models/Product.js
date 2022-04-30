import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema

const ProductSchema = new mongoose.Schema(
    {
        // Product_Name: {
        //     type: String,
        //     trim: true,
        //     required: true,
        //     // maxlength: 32
        // },
        // Product_Description: {
        //     type: String,
        //     trim: true,
        //     required: true,
        //     // minlength: 10
        // },
        // Category: {
        //     type: ObjectId,
        //     ref: "Category"
        // },
        // Sub_Category: {
        //     type: ObjectId,
        //     ref: "SubCategory"
        // },
        // Group:{
        //     type: ObjectId,
        //     ref: "Group"
        // },
        // Sub_Group:{
        //     type: ObjectId,
        //     ref: "SubGroup"
        // },
        // Sold:{
        //     type:Number,
        //     default: 0
        // },
        // Brand: {
        //     type: String,
        //     trim: true
        // },
        // Keywords: {
        //     type: Array,
        //     default: [],
        // },
        // Model_no: {
        //     type: String,
        //     default: null,
        // },
        // Rating: {
        //     type: Number,
        //     default: 0
        // },
        // Quantity: {
        //     type: Number,
        //     required: true,
        //     default: 5
        // },
        // Product_Image: {
        //     type:String,
        //     required: true
        // },
        // Available_pincodes: {
        //     type: Array,
        //     default: []
        // },
        // Product_Price: {
        //     type: Number,
        //     required: true
        // }

        model_no: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            ref:"Category"
        },
        sub_category: {
            type: ObjectId,
            ref:"SubCategory"
        },
        group: {
            type: ObjectId,
            ref:"Group"
        },
        sub_group: {
            type: ObjectId,
            ref:"SubGroup"
        },
        brand: {
            type: ObjectId,
            ref:"Brand"
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        actual_price: {
            type: Number,
            required: true,
        },
        discount_price: {
            type: Number,
            required: true,
        },
        //   ratings_and_reviews: {
        //     type: Array,
        //     required: true,
        //   },
        attributes: {
            type: Object,
        },
        tags: {
            type: Array,
            default: [],
            required: true,
        },
        variants: {
            type: Array,
            default: [],
            required: true,
        },
    },
    { timestamps: true }
);


const Product = mongoose.model('Product', ProductSchema);

export default Product;