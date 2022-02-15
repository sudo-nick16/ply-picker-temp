import { Router } from "express";
import { me } from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/me", auth, (req, res) => {
  me(req, res);
});

export default router;
