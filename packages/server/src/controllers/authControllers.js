import twilio from "twilio";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";
import User from "../models/User.js";
import Mobile from "../models/Mobile.js";
import { setCookies } from "../utils/setCookies.js";
import { hashPassword } from "../utils/hashPassword.js";
import nodemailer from "nodemailer";
import {
  COOKIE_NAME,
  MOBILE_TOKEN_SECRET,
  ORIGIN,
  OTP_MSG_ID,
  REFRESH_TOKEN_SECRET,
  SMTP_PASSWORD,
  SMTP_USER,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
} from "../constants.js";
import { createAccessToken } from "../utils/authTokens.js";
import { createMobileToken } from "../utils/createMobileToken.js";
import mongoose from "mongoose";

// creating twilio client
const twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
// create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export const verifyMobile = async (req, res) => {
  const { mobileNumber } = req.body;
  const number = `+91${mobileNumber}`;

  if (!validator.isMobilePhone(number, "en-IN")) {
    return res.status(400).json({
      error: "Invalid mobile number",
    });
  }

  const mobile = await Mobile.findOne({ mobile_number: number }).exec();

  if (mobile && mobile.registered) {
    return res.status(400).json({
      error: "Mobile number already registered",
    });
  }
  const otp = Math.random().toString().slice(2, 8);

  // console.log(message)
  if (!mobile) {
    const newMobile = new Mobile({
      mobile_number: number,
      otp: createMobileToken(otp),
    });
    await newMobile.save();
    console.log("mobile saved", newMobile);
  } else {
    // updating token if mobile has already been tried but not registered
    mobile.otp = createMobileToken(otp);
    await mobile.save();
  }

  try {
    await twilioClient.messages.create({
      // in prod
      messagingServiceSid: OTP_MSG_ID,
      body: `Your OTP is ${otp}`,
      // from: TWILIO_NUMBER,
      to: number,
      setTimeout: 10000,
    });

    return res.status(200).json({
      msg: "OTP sent.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Couldn't send the OTP, Please try again!",
    });
  }
};

export const register = async (req, res) => {
  const { name, email, password, mobileNumber, otp, gender } = req.body;
  const number = `+91${mobileNumber}`;

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Invalid email",
    });
  }
  if (!validator.isMobilePhone(number, "en-IN")) {
    return res.status(400).json({
      error: "Invalid mobile number",
    });
  }

  const user = await User.findOne({ email }).exec();

  if (user) {
    return res.status(400).json({
      error: "User already exists",
    });
  }
  const mobile = await Mobile.findOne({ mobile_number: number }).exec();
  console.log("mobile", mobile);
  if (!mobile) {
    return res.status(400).json({
      error: "Mobile number not verified",
    });
  }
  try {
    const otpDB = jwt.verify(mobile.otp, MOBILE_TOKEN_SECRET).otp;
    console.log(otpDB, otp, "hellow");
    if (otpDB !== otp) {
      return res.status(400).json({
        error: "Invalid OTP",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: "OTP expired",
    });
  }
  try {
    const newUser = new User({
      name,
      email,
      password: await hashPassword(password),
      mobile_number: number,
      mobile_verified: true,
      gender: gender || "",
    });

    await newUser.save();

    mobile.registered = true;
    mobile.user = mongoose.Types.ObjectId(newUser._id);
    console.log(mobile, "mobile");
    await mobile.save();

    const repUser = newUser.toObject();
    delete repUser.password;

    setCookies(res, newUser);
    return res.status(200).json({
      user: repUser,
      accessToken: createAccessToken(newUser),
      msg: "User created.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error creating user.",
    });
  }
};

// login controller
export const login = async (req, res) => {
  const { emailOrMobile, password } = req.body;

  let user;
  if (validator.isEmail(emailOrMobile)) {
    user = await User.findOne({ email: emailOrMobile }).exec();
  } else if (validator.isMobilePhone(`+91${emailOrMobile}`, "en-IN")) {
    user = await User.findOne({ mobile_number: `+91${emailOrMobile}` }).exec();
  }

  if (!user) {
    return res.status(400).json({
      error: "User does not exist.",
    });
  }

  const isAuth = await bcryptjs.compare(password, user.password);
  console.log(isAuth, "auth password", password, user.password);
  if (!isAuth) {
    console.log("password not matched");
    return res.status(400).json({
      error: "Invalid password.",
    });
  }

  setCookies(res, user);
  return res.status(200).json({
    user: user,
    accessToken: createAccessToken(user),
    msg: "User logged in.",
  });
};

export const logout = async (req, res) => {
  res.clearCookie(COOKIE_NAME);
  return res.status(200).json({
    msg: "User logged out.",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Invalid email",
    });
  }
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return res.status(400).json({
      error: "User does not exist.",
    });
  }

  const RESET_PASSWORD_SECRET = user.password;

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, RESET_PASSWORD_SECRET, { expiresIn: "15m" });
  const resetLink = `${ORIGIN}/reset-password/${user.id}/${token}`;

  try {
    await transporter.sendMail({
      from: "plypickerdevs@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Reset Password link: ${resetLink}`,
      html: `<h1>Here's your reset-password url</h1><p>${resetLink}<p>`,
    });
    return res.status(200).json({
      msg: "Reset link sent.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Error sending reset link.",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { id, token, password } = req.body;
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({
      error: "User does not exist.",
    });
  }
  try {
    const RESET_PASSWORD_SECRET = user.password;

    const payload = jwt.verify(token, RESET_PASSWORD_SECRET);
    if (!payload) {
      throw new Error("Invalid token");
    }
    user.password = await hashPassword(password);
    console.log("new password", user.password);
    user.token_version += 1;
    await user.save();
    return res.status(200).json({
      msg: "Reset Password successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: "Link Expired.",
    });
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.plypicker;
  let payload;
  console.log("refresh token");
  try {
    if (!token) {
      throw new Error("No token");
      // return res.status(401).json({
      //   authFailed: true,
      //   error: "No token.",
      // });
    }
    try {
      payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error("Invalid token");
    }
    const user = await User.findById(payload._id).exec();
    if (!user) {
      throw new Error("User does not exist");
      // return res.status(401).json({
      //   authFailed: true,
      //   error: "User does not exist",
      // });
    }
    console.log(payload, "payload");
    if (user.token_version !== payload.token_version) {
      console.log("token version not matched");
      throw new Error("Token version not matched");
      // return res.status(401).json({
      //   authFailed: true,
      //   error: "Token expired",
      // });
    }
    setCookies(res, user);
    return res.status(200).json({
      accessToken: createAccessToken(user),
      msg: "Token refreshed.",
    });
  } catch (err) {
    // console.log(err);
    res.clearCookie(COOKIE_NAME);
    return res.status(401).json({
      authFailed: true,
      error: err.message,
    });
  }
};

export const otpLogin = async (req, res) => {};
