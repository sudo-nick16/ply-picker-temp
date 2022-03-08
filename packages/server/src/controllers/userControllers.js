import User from "../models/User.js";
import { createAccessToken } from "../utils/authTokens.js";

export const me = async (req, res) => {
  const u = req.user;
  const user = await User.findById(u._id).exec();
  delete user.password;
  console.log("user", user);

  if (user) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      mobile: user.mobile_number,
      accessToken: createAccessToken(user),
    });
  } else {
    res.status(400).json({
      error: "User does not exist.",
    });
  }
};

export const updateMe =  async (req, res) => {
  // const {}
}