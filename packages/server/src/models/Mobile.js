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
    },
    // one to one relation with user - maybe in future
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // }
});

const Mobile = mongoose.model("mobile", MobileSchema);

export default Mobile;