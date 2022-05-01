import { Router } from "express";

const router = Router();
import {create, getSubCategories, getSubcategoryById, remove} from "../controllers/subCategoryControllers.js"; 

// router.post("/subcategory/create", create) // to be implemented in admin panel

router.get("/subcategories", getSubCategories)

router.get("/subcategories/:subcategoryID", getSubcategoryById)

// router.delete("/subcategory/:subcategoryID", remove) // to be implemented in admin panel

export default router;