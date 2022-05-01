import { Router } from "express";
const router = Router();

import { create, getBrand, getBrandById, remove } from "../controllers/BrandController.js"

router.post("/brand/create", create) // to be implemented in admin panel

router.get("/brand", getBrand)

router.get("/brand/:brandID", getBrandById)

// router.delete("/brand/:brandID", remove) // to be implemented in admin panel

export default router;