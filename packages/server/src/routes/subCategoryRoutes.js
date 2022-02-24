import { Router } from "express";

const router = Router();
import {create, getSubCategories} from "../controllers/subCategoryControllers.js"; 

router.post("/subcategory/create", create)

router.get("/subcategories", getSubCategories)

export default router;