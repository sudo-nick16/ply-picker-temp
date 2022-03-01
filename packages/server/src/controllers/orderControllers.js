import CartItem from "../models/CartItem.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import validator from "validator";
import twilio from "twilio";
import {
  DELIVERY,
  DELIVERY_MSG_ID,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
} from "../constants.js";

// creating twilio client
const twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const createOrder = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).exec();

  const { address, phone, payment_mode } = req.body;

  const contact_number = phone ? `+91${phone}` : user.mobile_number;

  console.log(contact_number);

  if (!validator.isMobilePhone(contact_number, "en-IN")) {
    return res.status(400).json({
      error: "Invalid contact number",
    });
  }
  const cartItems = await CartItem.find({ user: _id })
    .populate({ path: "product_id" })
    .exec();
  if (!cartItems.length) {
    return res.status(404).json({
      error: "Cart is empty. Please add some items.",
    });
  }
  try {
    const total = cartItems.reduce((amt, item) => {
      const cartItemTotal =
        parseFloat(item.product_id.Product_Price) * item.quantity;
      return amt + cartItemTotal;
    }, 0);

    const order_items = cartItems.map((item) => {
      let price = parseFloat(item.product_id.Product_Price) * item.quantity;
      let quantity = item.quantity;
      let product = item.product_id._id;
      return {
        price,
        quantity,
        product,
      };
    });

    if (payment_mode !== "COD") {
      // razor pay integration
    }

    const order = new Order({
      user_id: _id,
      order_items,
      total,
      address: address || user.address[0] || {},
      contact_number: contact_number || user.mobile_number,
    });

    await order.save();
    // send a message to the delivery guy
    try {
      const msg = await twilioClient.messages.create({
        // in prod
        messagingServiceSid: DELIVERY_MSG_ID,
        body: `New Order Placed by ${user.name}\nOrder Id: ${order._id} \nURL: http://localhost:3000/delivery/orders/${order._id}`,
        // from: TWILIO_NUMBER,
        to: DELIVERY,
        setTimeout: 10000,
      });
      console.log(msg);
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't send the order details, Please try again!");
    }

    await CartItem.deleteMany({ user: _id });
    return res.status(200).json({
      msg: "Order placed successfully",
      order_id: order._id,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Could not place order",
    });
  }
  // console.log(cartItems);
};

export const getOrders = async (req, res) => {
  const { _id } = req.user;
  const orders = await Order.find({ user_id: _id })
    .populate({ path: "order_items" })
    .exec();
  return res.status(200).json(orders);
};

export const getOrder = async (req, res) => {
  const { _id } = req.user;
  const { order_id } = req.params;
  const order = await Order.findOne({ _id: order_id, user_id: _id })
    .populate({ path: "order_items" })
    .exec();
  return res.status(200).json(order);
};
