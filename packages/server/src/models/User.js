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
    email_verified: {
      type: Boolean,
      default: false,
    },
    mobile_verified: {
      type: Boolean,
      default: false,
    },
    token_version: {
      type: Number,
      default: 0,
    },
    dob: {
      type: Date,
    },
    addresses: {
      type: [
        {
          address_line_1: String,
          address_line_2: String,
          city: String,
          state: String,
          country: String,
          pincode: String,
        },
      ],
      default: [],
    },
    wishlist: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          unique: true,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.pre("save", async function (next) {
  // this.password = await argon2.hash(this.password);
//   const salt = await bcryptjs.genSalt(10);
//   const hashedPassword = await bcryptjs.hash(this.password, salt);
//   this.password = hashedPassword;
//   next();
// });

const User = mongoose.model("User", UserSchema);

export default User;
