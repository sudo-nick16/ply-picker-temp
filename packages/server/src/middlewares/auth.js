import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants.js";

export const auth = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    console.log("No authorization header found");
    return res.status(401).json({
      error: "No authorization header.",
    });
  }
  const token = authorization.split(" ")[1];
  try {
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    // console.log(user);
    if (user) {
      req.user = user;
      return next();
    } else {
      res.status(401).json({
        error: "Could not authenticate user.",
      });
      // throw new Error("Couldn't verify the user.");
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      error: "User not authenticated.",
    });
  }
};
