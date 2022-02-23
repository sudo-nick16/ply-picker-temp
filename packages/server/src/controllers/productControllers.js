import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  const { product_id } = req.body;
  const product = await Product.findById(product_id).exec();
  if (!product) {
    return res.status(404).json({
      error: "Product not found. Could not add to cart.",
    });
  }
  const cartItem = await CartItem.findOne({
    user_id: req.user._id,
    product_id,
  }).exec();
  //   console.log(cartItem);
  if (cartItem) {
    if (cartItem.quantity + 1 <= product.Quantity) {
      console.log("adding product to cart");
      cartItem.quantity = cartItem.quantity + 1;
      await cartItem.save();
    }
  } else {
    const newCartItem = new CartItem({
      user_id: req.user._id,
      product_id,
      quantity: 1,
    });
    await newCartItem.save();
  }
  return res.status(200).json({
    msg: "Product added to cart.",
  });
};

export const allProducts = async (req, res) => {
  const products = await Product.find();
  console.log("all");
  res.status(200).send(products);
};

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.p_id);
  res.status(200).send(product);
};
