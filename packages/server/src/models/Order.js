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
        address_line_1: String,
        address_line_2: String,
        city: String,
        state: String,
        country: String,
        pincode: String,
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
        default: "Pending",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
