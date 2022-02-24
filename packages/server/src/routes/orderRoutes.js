import { Router } from "express";
import { createOrder, getOrder, getOrders } from "../controllers/orderControllers.js";
import { auth } from "../middlewares/auth.js";

const orderRouter = Router();

orderRouter.post("/", auth, (req, res) => {
  createOrder(req, res);
});

orderRouter.get("/", auth, (req, res) => {
  getOrders(req, res);
});

orderRouter.get("/:order_id", auth, (req, res) => {
  getOrder(req, res);
});

export default orderRouter;
