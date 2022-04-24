import { Router } from "express";
import {
  addToCart,
  getMyCartItems,
  removeFromCart,
  removeProductFromCart,
  updateQuantity,
} from "../controllers/cartControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.patch("/qty", auth, (req, res) => {
  updateQuantity(req, res);
});

router.delete("/:cart_id", auth, (req, res) => {
  removeFromCart(req, res);
});

router.patch("/:cart_id", auth, (req, res) => {
  removeProductFromCart(req, res);
});

router.get("/", auth, (req, res) => {
  getMyCartItems(req, res);
});

router.post("/", auth, (req, res) => {
  addToCart(req, res);
});

export default router;
