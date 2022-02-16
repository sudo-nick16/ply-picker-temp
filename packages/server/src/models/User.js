import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      unique: true,
      required: true,
    },
    cart: {
      type: [
        {
          quantity: Number,
          product_id: mongoose.Schema.Types.ObjectId,
          price: Number,
        },
      ],
      default: [],
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    mobile_verified: {
      type: Boolean,
      default: false,
    },
    joined_date: {
      type: Date,
      default: Date.now,
    },
    token_version: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  // this.password = await argon2.hash(this.password);
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("users", UserSchema);

export default User;
