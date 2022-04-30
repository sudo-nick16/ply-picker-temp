import { Router } from "express";
const router = Router();

import { create, getBrand, getBrandById, remove } from "../controllers/BrandController.js"

router.post("/brand/create", create)

router.get("/brand", getBrand)

router.get("/brand/:brandID", getBrandById)

router.delete("/brand/:brandID", remove)

export default router;