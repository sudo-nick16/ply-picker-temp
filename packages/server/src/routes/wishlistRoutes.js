import { Router } from "express";
import {
  addToCart,
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

wishlistRouter.delete("/cart/:p_id", auth, (req, res) => {
  addToCart(req, res);
});

wishlistRouter.get("/", auth, (req, res) => {
  getWishList(req, res);
});

export default wishlistRouter;
