import { Router } from "express";
const router = Router();

import { create, getSubGroups, getSubGroupById } from "../controllers/subGroupController.js"

router.post("/subgroup/create", create)

router.get("/subgroups", getSubGroups)

router.get("/subgroups/:subGroupID", getSubGroupById)

export default router;