import { Router } from "express";

const router = Router();

import { create, getCategories, getCategoryByID, remove } from "../controllers/categoryControllers.js";

// router.post(
//   "/category/create",
//   // requireSignin , isAuth , isAdmin ,
//   create
// );
// to be implemented in admin panel
router.get("/categories", getCategories);

router.get("/categories/:categoryID", getCategoryByID)

// router.delete("/categories/:categoryID", remove) // to be implemented in admin panel

export default router;
