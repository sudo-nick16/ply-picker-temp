import { Router } from "express";
const router = Router();

import { create, getSubGroups, getSubGroupById, remove } from "../controllers/subGroupController.js"

// router.post("/subgroup/create", create) // to be implemented in admin panel

router.get("/subgroups", getSubGroups)

router.get("/subgroups/:subGroupID", getSubGroupById)

// router.delete("/subgroups/:subGroupID", remove) // to be implemented in admin panel

export default router;