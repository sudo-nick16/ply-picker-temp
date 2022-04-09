import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    razorpayPaymentId: {
        type: String,
        unique: true,
        required: true
    },
    razorpayOrderId: {
        type: String,
        unique: true,
        required: true
    },
    razorpaySignature: {
        type: String,
        unique: true,
        required: true
    },
    orderApiId: {
        type: String,
        unique: true,
        required: true
    },
    orderId: {
        type: String,
        unique: true,
        required: true
    }
})

const Payment = mongoose.model("Payment",PaymentSchema);

export default Payment;