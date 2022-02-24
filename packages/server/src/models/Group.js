import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const GroupSchema = new mongoose.Schema(
  {
    Group_name: {
      type: String,
      required: true,
    },
    Sub_Category: {
      type: ObjectId,
      ref: "SubCategory",
    },
    Category: {
      type: ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", GroupSchema);

export default Group;
