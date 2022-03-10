import { Router } from "express";
const router = Router();

import { create, getSubGroups, getSubGroupById, remove } from "../controllers/subGroupController.js"

router.post("/subgroup/create", create)

router.get("/subgroups", getSubGroups)

router.get("/subgroups/:subGroupID", getSubGroupById)

router.delete("/subgroups/:subGroupID", remove)

export default router;