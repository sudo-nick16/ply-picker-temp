import { COOKIE_NAME, _env_ } from "../constants.js";
import { createRefreshToken } from "./authTokens.js";

export const setCookies = (res, user) => {
  const token = createRefreshToken(user);

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: _env_ === "production" ? true : false,
    sameSite: "lax",
  });
};
