import { Router } from "express";
const router = Router();

import { create, getGroupById, getGroups, remove } from "../controllers/groupControllers.js";

router.post("/group/create", create)

router.get("/groups", getGroups)

router.get("/groups/:groupID", getGroupById)

router.delete("/groups/:groupID", remove)

export default router;