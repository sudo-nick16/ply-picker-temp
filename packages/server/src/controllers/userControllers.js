import User from "../models/User.js";
import { createAccessToken } from "../utils/authTokens.js";
import validator from "validator";
import { hashPassword } from "../utils/hashPassword.js";
import bcryptjs from "bcryptjs";
import { setCookies } from "../utils/setCookies.js";

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
  const {name, email} = req.body;
  const {_id} = req.user;
  const user = await User.findById(_id).exec();
  if(validator.isEmail(email)){
    user.email = email;
  }else{
    return res.status(400).json({
      error: "Invalid email",
    });
  }
  try{
    if(user){
      user.name = name;
      // user.mobile_number = phone;
      user.email_verified = false;
      await user.save();
      res.status(200).json({
        accessToken: createAccessToken(user),
        msg: "User updated successfully",
      });
    }else{
      throw new Error("User does not exist");
    }
  }catch(err){
    res.status(400).json({
      error: "Error updating user",
    });
  }
}

export const updatePassword = async (req, res) => {
  const {password, oldPass} = req.body;
  const {_id} = req.user;
  const user = await User.findById(_id).exec();
  try{
    if(user){
      const isAuth = await bcryptjs.compare(oldPass, user.password);
      if(!isAuth){
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
    }else{
      throw new Error("User does not exist");
    }
  }catch(err){
    res.status(400).json({
      error: "Error updating password",
    });
  }
}

export const addAddress = async (req, res) => {

}