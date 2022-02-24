import CartItem from "../models/CartItem.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  const { _id } = req.user;
  const cartItems = await CartItem.find({ user: _id })
    .populate({ path: "product_id" })
    .exec();
  if (!cartItems) {
    return res.status(404).json({
      error: "Cart is empty. Please add some items.",
    });
  }
  try {
    const total = cartItems.reduce((amt, item) => {
      const cartItemTotal =
        parseFloat(item.product_id.Product_Price) * item.quantity;
      console.log(cartItemTotal, typeof cartItemTotal, "cartItemTotal");
      return amt + cartItemTotal;
    }, 0);
    console.log(total, "total");

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

    const order = new Order({
      user_id: _id,
      order_items,
      total,
    });
    await order.save();
    // send a message to the delivery guy
    await CartItem.deleteMany({ user: _id });
    return res.status(200).json({
      msg: "Order placed successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Could not place order",
    });
  }
  console.log(cartItems);
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
