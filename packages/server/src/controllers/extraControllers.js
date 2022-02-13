import twilio from "twilio";
import validator from "validator";

import {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER,
  } from "../constants.js";
  import { createMobileToken } from "../utils/createMobileToken.js";


const twilioClient = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const verifyMobile = async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const number = `+91${mobileNumber}`;
    if (!validator.isMobilePhone(number, "en-IN")) {
      throw new Error("Invalid mobile number");
    }

    const mobile = await Mobile.findOne({ mobile_number: number });

    if (mobile && mobile.registered) {
      throw new Error("Mobile number already registered");
    }
    const otp = Math.random().toString().slice(2, 8);
    console.log(otp);

    // console.log(message)
    if(!mobile){
      const newMobile = new Mobile({
        mobile_number: number,
        otp: createMobileToken(otp),
      });
      
      await newMobile.save();
      console.log("mobile saved", newMobile);
    }else{
      // updating token if already tried but not registered
      mobile.otp = createMobileToken(otp);
      await mobile.save();
    }
    const message = await twilioClient.messages.create({
      // messagingServiceSid: "MG9752274e9e519418a7406176694466fa",
      body: `Your OTP is ${otp}`,
      from: TWILIO_NUMBER,
      to: number,
      setTimeout: 10000,
    });

    res.status(200).json({
      msg: "OTP sent.",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Couldn't verify, Please try again!",
    });
  }
};
