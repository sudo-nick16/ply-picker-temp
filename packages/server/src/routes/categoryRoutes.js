import { Router } from "express";

const router = Router();

import { create, getCategories, getCategoryByID } from "../controllers/categoryControllers.js";

router.post(
  "/category/create",
  // requireSignin , isAuth , isAdmin ,
  create
);

router.get("/categories", getCategories);

router.get("/categories/:categoryID", getCategoryByID)

export default router;
