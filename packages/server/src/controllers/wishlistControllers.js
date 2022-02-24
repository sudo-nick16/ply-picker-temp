import User from "../models/User.js";

export const addToWishlist = async (req, res) => {
  const { _id } = req.user;
  const { p_id } = req.body;
  const user = await User.findById(_id).exec();
  if (!user) {
    return res.status(404).json({
      error: "User not found. Could not add to wishlist.",
    });
  }
  if (user.wishlist.includes(p_id)) {
    return res.status(409).json({
      error: "Product already in wishlist.",
    });
  }
  user.wishlist.push(p_id);
  try {
    await user.save();
    return res.status(200).json({
      msg: "Product added to wishlist.",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { _id } = req.user;
  const { p_id } = req.params;
  const user = await User.findById(_id).exec();
  if (!user) {
    return res.status(404).json({
      error: "User not found. Could not remove from wishlist.",
    });
  }
  if (!user.wishlist.includes(p_id)) {
    return res.status(409).json({
      error: "Product not in wishlist.",
    });
  }
  user.wishlist = user.wishlist.filter((p) => p != p_id);
  try {
    await user.save();
    return res.status(200).json({
      msg: "Product removed from wishlist.",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

export const getWishList = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id)
    .select("wishlist")
    .populate({
      path: "wishlist",
      select: [
        "Product_Name",
        "Product_Price",
        "Product_Image",
        "Product_Description",
      ],
    })
    .exec();
  // console.log(user, "user");
  if (!user) {
    return res.status(404).json({
      error: "User not found. Could not get wishlist.",
    });
  }
  return res.status(200).json(user.wishlist);
};
