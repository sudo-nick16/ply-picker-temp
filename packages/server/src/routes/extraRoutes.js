import { Router } from "express";
import {
  refreshToken,
  resetPassword,
  verifyMobile,
} from "../controllers/extraControllers.js";

const router = Router();

router.post("/reset-password", (req, res) => {
  resetPassword(req, res);
});
router.post("/refresh_token", (req, res) => {
  refreshToken(req, res);
});
router.post("/verify-mobile", (req, res) => {
  verifyMobile(req, res);
});
export default router;
