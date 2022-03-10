import { Router } from "express";
import { addAddress, me, updateMe, updatePassword } from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/me", auth, (req, res) => {
  me(req, res);
});

router.patch("/me", auth, (req, res) => {
  updateMe(req, res);
});

router.patch("/me/password", auth, (req, res) => {
  updatePassword(req, res);
});

router.post("/me/addresses", auth, (req, res) => {
  addAddress(req, res);
})

export default router;
