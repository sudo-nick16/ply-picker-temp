import { Router } from "express";
import {
  login,
  logout,
  register,
  refreshToken,
  resetPassword,
  verifyMobile,
  forgotPassword,
} from "../controllers/authControllers.js";

const router = Router();

router.post("/login", (req, res) => {
  login(req, res);
});
router.post("/logout", (req, res) => {
  logout(req, res);
});
router.post("/signup", (req, res) => {
  register(req, res);
});
router.post("/reset-password", (req, res) => {
  forgotPassword(req, res);
});
router.post("/reset-password/:id/:token", (req, res) => {
  resetPassword(req, res);
});
router.post("/refresh-token", (req, res) => {
  refreshToken(req, res);
});
router.post("/verify-mobile", (req, res) => {
  verifyMobile(req, res);
});

export default router;
