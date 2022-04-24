import CartItem from "../models/CartItem.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import validator from "validator";
import razorpay from "razorpay";
import twilio from "twilio";
import {
  DELIVERY,
  DELIVERY_MSG_ID,
  ORIGIN,
  RZRPAY_KEY_ID,
  RZRPAY_KEY_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
} from "../constants.js";
import { createInvoice } from "../utils/createInvoice.js";

// creating twilio client
const twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const rzp = new razorpay({
  key_id: RZRPAY_KEY_ID,
  key_secret: RZRPAY_KEY_SECRET,
});

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
    let total = 0;

    const order_items = cartItems.map((item) => {
      let price = parseFloat(item.product_id.actual_price);
      let quantity = item.quantity;
      let product = item.product_id._id;
      let name = item.product_id.name;
      let image = item.product_id.attributes.image[0];
      total += parseFloat(item.product_id.actual_price) * item.quantity;
      return {
        cart_id: item._id,
        name,
        price,
        quantity,
        product,
        image,
      };
    });

    console.log(order_items);

    if (payment_mode !== "COD") {
      // razor pay integration
      try {
        const ord = new Order({
          user_id: _id,
          order_items,
          total,
          payment: {
            mode: "RAZORPAY",
            status: "PENDING",
          },
          address:
            (Object.keys(address).length ? address : null) || user.addresses[0],
          contact_number: contact_number || user.mobile_number,
        });

        const order = await rzp.orders.create({
          amount: total * 100,
          currency: "INR",
          receipt: `Payment against ${ord._id}`,
        });

        console.log(order);

        ord.razorpayOrderId = order.id;

        ord.invoice = `https://plypicker.s3.ap-south-1.amazonaws.com/invoices/${ord._id}_invoice.pdf`;

        await ord.save();

        createInvoice(ord, "RAZORPAY");

        return res.status(200).json({ order, mongoOrderId: ord._id });
      } catch (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: "Razorpay order creation failed." });
      }
    }

    const order = new Order({
      user_id: _id,
      order_items,
      total,
      payment: {
        mode: "COD",
        status: "PENDING",
      },
      address:
        (Object.keys(address).length ? address : null) || user.addresses[0],
      contact_number: contact_number || user.mobile_number,
    });
    order.invoice = `https://plypicker.s3.ap-south-1.amazonaws.com/invoices/${order._id}_invoice.pdf`;
    await order.save();

    createInvoice(order);

    // send a message to the delivery guy
    try {
      const msg = await twilioClient.messages.create({
        // in prod
        messagingServiceSid: DELIVERY_MSG_ID,
        body: `New Order Placed by ${user.name}\nOrder Id: ${order._id} \nURL: ${ORIGIN}/delivery/orders/${order._id}`,
        // from: TWILIO_NUMBER,
        to: DELIVERY,
        setTimeout: 10000,
      });
      console.log(msg);
    } catch (err) {
      console.log(err);
      throw new Error("Couldn't send the order details, Please try again!");
    }

    order.order_items.map(async (item) => {
      await CartItem.findByIdAndDelete(item.cart_id).exec();
    });

    // await CartItem.deleteMany({ $and: [{user: _id}, {order: false}] });
    return res.status(200).json({
      msg: "Order placed successfully",
      order_id: order._id,
    });
  } catch (err) {
    console.log(err.message);
    if (err.message.includes("validation failed: address")) {
      return res.status(400).json({
        error: "Please add an address in ur profile section.",
      });
    }
    return res.status(400).json({
      error: "Could not place order",
    });
  }
  // console.log(cartItems);
};

export const getCurrOrders = async (req, res) => {
  const { _id } = req.user;
  // const orders = await Order.find({ user_id: _id })
  const orders = await Order.find({
    user_id: _id,
    "delivery.delivered": false,
  })
    .populate({ path: "order_items" })
    .sort({ createdAt: -1 })
    .exec();
  console.log(orders, "orders");
  return res.status(200).json(orders);
};

export const getOrders = async (req, res) => {
  const { _id } = req.user;
  const orders = await Order.find({ user_id: _id })
    .populate({ path: "order_items" })
    .sort({ createdAt: -1 })
    .exec();
  console.log(orders, "orders");
  return res.status(200).json(orders);
};

export const getHistoryOrders = async (req, res) => {
  const { _id } = req.user;
  const orders = await Order.find({
    user_id: _id,
    "delivery.delivered": true,
  })
    .populate({ path: "order_items" })
    .sort({ createdAt: -1 })
    .exec();
  console.log(orders);
  return res.status(200).json(orders);
};

export const getOrder = async (req, res) => {
  // const { _id } = req.user;
  const { order_id } = req.params;
  if (!order_id) {
    return res.status(400).json({
      error: "Please provide order id",
    });
  }
  console.log("order");
  console.log(order_id);
  const order = await Order.findById(order_id)
    .populate({ path: "order_items" })
    .exec();
  console.log(order);
  if (order) {
    return res.status(200).json(order);
  } else {
    return res.status(404).json({
      error: "Order not found",
    });
  }
};
