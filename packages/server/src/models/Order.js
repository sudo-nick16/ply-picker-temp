import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    total: {
      type: Number,
      required: true,
    },
    order_items: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            unique: true,
          },
          quantity: {
            type: Number,
            min: 1,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    address: {
      type: {
        name: String,
        address: String,
        mobile: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
      },
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    payment: {
      mode: {
        type: String,
        required: true,
        default: "COD",
      },
      status: {
        type: String,
        required: true,
        default: "PENDING",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
