import { Router } from "express";
import { createRazorpayOrder, verifyRazorpayOrder } from "../controllers/paymentControllers.js";
import { auth } from "../middlewares/auth.js";

const paymentRouter = Router();

paymentRouter.post("/orders", auth, (req, res) => {
  createRazorpayOrder(req, res);
});

paymentRouter.post("/verify", auth, (req, res) => {
  verifyRazorpayOrder(req, res);
});



export default paymentRouter;
