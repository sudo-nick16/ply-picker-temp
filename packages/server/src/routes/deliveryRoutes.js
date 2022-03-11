import { Router } from "express";
import { getDelOrder } from "../controllers/deliveryControllers.js";
import { auth } from "../middlewares/auth.js";

const delRouter = Router();

delRouter.get("/:order_id", auth, (req, res) => {
  getDelOrder(req, res);
});

export default delRouter;
