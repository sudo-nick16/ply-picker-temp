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
          cart_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CartItem",
            required: true,
            unique: true,
          },
          name: {
            type: String,
            required: true,
          },
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
    invoice: {
      type: String,
    },
    delivery: {
      status: {
        type: String,
        default: "not delivered"
      },
      due: {
        type: Date,
      },
      delivered: {
        type: Boolean 
      },
      delivered_on: {
        type: Date,
      }
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
    razorpay_order_id: {
      type: String,
      unique: true
    },
    // cart_ref: {
    //   type: [mongoose.Schema.Types.ObjectId],
    //   ref: "CartItem",
    //   default: [],
    // }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
