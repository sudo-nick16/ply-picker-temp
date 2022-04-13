import User from "../models/User.js";
import validator from "validator";
import Order from "../models/Order.js";
import razorpay from "razorpay";
import {
  DELIVERY,
  DELIVERY_MSG_ID,
  ORIGIN,
  RZRPAY_KEY_ID,
  RZRPAY_KEY_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
} from "../constants.js";
import CartItem from "../models/CartItem.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import Payment from "../models/Payment.js";
import twilio from "twilio";

const twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const rzp = new razorpay({
  key_id: RZRPAY_KEY_ID,
  key_secret: RZRPAY_KEY_SECRET,
});

export const failedRazorpayOrder = async (req, res) => {
  const { razorpayOrderId } = req.body;
  const order = await Order.find({ razorpayOrderId }).exec();
  if (!order) {
    return res.status(404).json({
      error: "Order not found",
    });
  }
  order.payment.status = "FAILED";
  await order.remove();
  return res.status(200).json({
    message: "Order failed",
  });
};

export const verifyRazorpayOrder = async (req, res) => {
  const { _id } = req.user;
 
  try {
    console.log(req.body);
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      mongoOrderId,
    } = req.body;

    const succ = validatePaymentVerification(
      {
        order_id: razorpayOrderId || "",
        payment_id: razorpayPaymentId || "",
      },
      razorpaySignature,
      RZRPAY_KEY_SECRET
    );

    console.log(succ);

    if (!succ) {
      const order = await Order.findOneAndDelete({ razorpayOrderId }).exec();
      console.log(order, "to be removed cuz failed...");
      // await CartItem.deleteMany({ user: _id });

      return res.status(400).json({ error: "Order not found... : (" });
    } else {
      const order = await Order.findByIdAndUpdate(mongoOrderId, {
        payment: {
          mode: "RAZORPAY",
          status: "SUCCESS",
        },
      }).exec();
      console.log(order);
      if (!order) {
        throw new Error("Order not found");
      }
      const payment = new Payment({
        orderApiId: orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        orderId: mongoOrderId,
      });
      payment.save();

      order.order_items.map(async (item) => {
        await CartItem.findByIdAndDelete(item.cart_id).exec();
      });

      // await CartItem.deleteMany({ $and: [{ user: _id }, { _id: { $in: order.order_items}}]});

      // await CartItem.deleteMany({ user: _id });

      try {
        const msg = await twilioClient.messages.create({
          // in prod
          messagingServiceSid: DELIVERY_MSG_ID,
          body: `New Order Placed by ${_id}\nOrder Id: ${mongoOrderId} \nURL: ${ORIGIN}/delivery/orders/${mongoOrderId}`,
          // from: TWILIO_NUMBER,
          to: DELIVERY,
          setTimeout: 10000,
        });
        console.log(msg);
      } catch (err) {
        console.log(err);
        console.log("Couldn't send the order details, Please try again!");
      }
      return res.status(200).json({
        msg: "successfully paid",
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Payment verification failed.",
    });
  }
};
