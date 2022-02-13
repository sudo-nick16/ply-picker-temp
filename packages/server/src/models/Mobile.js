import mongoose from "mongoose";

const MobileSchema = mongoose.Schema({
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
    }
});

const Mobile = mongoose.model("mobile", MobileSchema);

export default Mobile;