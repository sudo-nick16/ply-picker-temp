import { Router } from "express";
import { verifyRazorpayOrder } from "../controllers/paymentControllers.js";
import { auth } from "../middlewares/auth.js";

const paymentRouter = Router();

paymentRouter.post("/verify", auth, (req, res) => {
  verifyRazorpayOrder(req, res);
});

export default paymentRouter;
