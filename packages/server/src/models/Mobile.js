import mongoose from "mongoose";

const MobileSchema = new mongoose.Schema(
  {
    mobile_number: {
      type: String,
      unique: true,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    registered: {
      type: Boolean,
      default: false,
    },
    // one to one relation with user - maybe in future
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// alternate to createMobileToken - this way is cleaner
// MobileSchema.pre("save", async function (next) {
//   const otp = this.otp;
//   const token = jwt.sign({ otp }, MOBILE_TOKEN_SECRET, { expiresIn: "15m" });
//   this.otp = token;
//   next();
// });

const Mobile = mongoose.model("Mobile", MobileSchema);

export default Mobile;
