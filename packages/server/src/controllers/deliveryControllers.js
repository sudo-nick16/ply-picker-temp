import Order from "../models/Order";

export const getDelOrder = async (req, res) => {
  const { order_id } = req.params;
  console.log("order");
  console.log(order_id);
  const order = await Order.findById(order_id)
    .populate({ path: "order_items" })
    .exec();
  console.log(order);
  return res.status(200).json(order);
};
