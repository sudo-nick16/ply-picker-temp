import { Router } from "express";
import { addToCart, allProducts, getProduct } from "../controllers/productControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/", (req, res) => {
  allProducts(req, res);
});

router.get("/:p_id", (req, res) => {
  getProduct(req, res);
});

router.post("/add-to-cart", auth, (req, res) => {
  addToCart(req, res);
});

export default router;
