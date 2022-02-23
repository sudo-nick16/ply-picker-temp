import CartItem from "../models/CartItem.js";

export const updateQuantity = async (req, res) => {
  const { product_id, quantity } = req.body;
  const cartItem = await CartItem.findOne({
    user_id: req.user._id,
    product_id,
  })
    .populate("product_id")
    .exec();
  if (!cartItem) {
    return res.status(404).json({
      error: "Product not found. Could not update quantity.",
    });
  }
  if (quantity === 0) {
    const item = await CartItem.findByIdAndDelete(cartItem._id).exec();
    console.log(item);
    if (!item) {
      return res.status(409).json({
        error: "Could not delete cart item.",
      });
    } else {
      return res.status(200).json({
        msg: "Cart item deleted.",
      });
    }
  }
  if (quantity <= cartItem.product_id.quantity || quantity > 0) {
    cartItem.quantity = quantity;
    await cartItem.save();
    return res.status(200).json({
      msg: "Quantity updated.",
    });
  } else {
    return res.status(404).json({
      error: "Insufficient quantity. Could not update quantity.",
    });
  }
};

export const getMyCartItems = async (req, res) => {
  const { _id } = req.user;
  console.log("lets dies bois");
  const cartItems = await CartItem.find({ user_id: _id })
    .populate("product_id")
    .exec();
  //   console.log(cartItems);
  return res.status(200).send(cartItems);
};

export const removeFromCart = async (req, res) => {
  const { cart_id } = req.params;
  const cartItem = await CartItem.findByIdAndDelete(cart_id).exec();
  console.log(cartItem);
  if (!cartItem) {
    return res.status(409).json({
      error: "Could not delete cart item.",
    });
  } else {
    return res.status(200).json({
      msg: "Cart item deleted.",
    });
  }
};
