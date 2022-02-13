import dotenv from 'dotenv';
dotenv.config();

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const _env_ = process.env.NODE_ENV;
export const COOKIE_NAME = process.env.COOKIE_NAME;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const PORT = process.env.PORT;
export const ORIGIN = process.env.ORIGIN;
export const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
export const MOBILE_TOKEN_SECRET = process.env.MOBILE_TOKEN_SECRET;