import jwt from "jsonwebtoken"
import { MOBILE_TOKEN_SECRET } from "../constants.js";

export const createMobileToken = (otp) => {
    const token = jwt.sign({ otp }, MOBILE_TOKEN_SECRET, { expiresIn: "5m" });
    return token;
}