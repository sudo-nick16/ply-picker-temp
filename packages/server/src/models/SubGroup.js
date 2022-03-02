import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema

const SubGroupSchema = new mongoose.Schema({
    SubGroup_name: {
        type: String,
        required: true
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

}, { timestamps: true })

const SubGroup = mongoose.model("SubGroup", SubGroupSchema)

export default SubGroup;
