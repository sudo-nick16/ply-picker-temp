import { Router } from "express";
import { getMyCartItems, removeFromCart, updateQuantity } from "../controllers/cartControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.patch("/qty", auth, (req, res) => {
  updateQuantity(req, res);
});

router.delete("/:cart_id", auth, (req, res) => {
  removeFromCart(req, res);
});

router.get("/my-cart", auth, (req, res) => {
    getMyCartItems(req, res);
})

export default router;
