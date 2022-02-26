import { Router } from "express";

const router = Router();
import {create, getSubCategories, getSubcategoryById} from "../controllers/subCategoryControllers.js"; 

router.post("/subcategory/create", create)

router.get("/subcategories", getSubCategories)

router.get("/subcategories/:subcategoryID", getSubcategoryById)

export default router;