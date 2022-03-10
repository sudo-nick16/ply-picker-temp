import User from "../models/User.js";
import { createAccessToken } from "../utils/authTokens.js";
import validator from "validator";
import { hashPassword } from "../utils/hashPassword.js";
import bcryptjs from "bcryptjs";
import { setCookies } from "../utils/setCookies.js";

export const me = async (req, res) => {
  const u = req.user;
  const user = await User.findById(u._id).exec();
  const repUser = user.toObject();
  delete repUser.password;
  console.log("user", repUser);

  if (user) {
    res.status(200).json({
      user: repUser,
      accessToken: createAccessToken(user),
    });
  } else {
    res.status(400).json({
      error: "User does not exist.",
    });
  }
};

export const updateMe = async (req, res) => {
  const { name, email } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id).exec();
  if (validator.isEmail(email)) {
    user.email = email;
  } else {
    return res.status(400).json({
      error: "Invalid email",
    });
  }
  try {
    if (user) {
      user.name = name;
      // user.mobile_number = phone;
      user.email_verified = false;
      await user.save();
      res.status(200).json({
        accessToken: createAccessToken(user),
        msg: "User updated successfully",
      });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).json({
      error: "Error updating user",
    });
  }
};

export const updatePassword = async (req, res) => {
  const { password, oldPass } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id).exec();
  try {
    if (user) {
      const isAuth = await bcryptjs.compare(oldPass, user.password);
      if (!isAuth) {
        throw new Error("Old password is incorrect");
      }
      user.password = await hashPassword(password);
      user.token_version = user.token_version + 1;
      await user.save();
      setCookies(res, user);
      res.status(200).json({
        accessToken: createAccessToken(user),
        msg: "Password updated successfully",
      });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).json({
      error: "Error updating password",
    });
  }
};

export const addAddress = async (req, res) => {
  const { _id } = req.user;
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({
      error: "Address is required",
    });
  }
  address.mobile = `+91${address.mobile}`;
  console.log("address", address);
  if (!validator.isMobilePhone(address.mobile, "en-IN")) {
    return res.status(400).json({
      error: "Invalid Phone Number",
    });
  }
  console.log("address", address);
  const user = await User.findById(_id).exec();
  try {
    if (user) {
      user.addresses.push(address);
      await user.save();
      res.status(200).json({
        msg: "Address added successfully",
      });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Error adding address",
    });
  }
};
