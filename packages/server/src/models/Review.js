import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,

    },
    description: {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
