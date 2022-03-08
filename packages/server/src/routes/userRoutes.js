import { Router } from "express";
import { me, updateMe } from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/me", auth, (req, res) => {
  me(req, res);
});

router.patch("/me", auth, (req, res) => {
  updateMe(req, res);
});

export default router;
