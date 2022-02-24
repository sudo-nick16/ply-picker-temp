import { Router } from "express";
import {
  addToWishlist,
  getWishList,
  removeFromWishlist,
} from "../controllers/wishlistControllers.js";
import { auth } from "../middlewares/auth.js";

const wishlistRouter = Router();

wishlistRouter.post("/", auth, (req, res) => {
  addToWishlist(req, res);
});

wishlistRouter.delete("/:p_id", auth, (req, res) => {
  removeFromWishlist(req, res);
});

wishlistRouter.get("/", auth, (req, res) => {
  getWishList(req, res);
});

export default wishlistRouter;
