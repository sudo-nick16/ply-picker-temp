import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema

const BrandSchema = new mongoose.Schema({
    SubGroup: {
        type: ObjectId,
        ref: "SubGroup"
    },
    Group: {
        type: ObjectId,
        ref: "Group"
    },
    Sub_Category: {
        type: ObjectId,
        ref: "SubCategory"
    },
    Category: {
        type: ObjectId,
        ref: "Category"
    },
    Brand_name: {
        type: String,
        required: true
    },
    Brand_image: {
        type: String,
    }

}, { timestamps: true })

const SubGroup = mongoose.model("Brand", BrandSchema)

export default SubGroup;
