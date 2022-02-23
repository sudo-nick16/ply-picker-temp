import { Router } from "express";

const router = Router();

import { create, getCategories } from "../controllers/categoryControllers.js";

router.post(
  "/category/create",
  // requireSignin , isAuth , isAdmin ,
  create
);

router.get("/categories", getCategories);

export default router;
