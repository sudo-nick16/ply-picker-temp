import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const SubCategorySchema = new mongoose.Schema(
  {
    Sub_Category_name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    Sub_Category_image: {
      type: String,
    },
    Category: {
      type: ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory;