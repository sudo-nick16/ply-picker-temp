import { Router } from "express";
const router = Router();

import { create, getGroups } from "../controllers/groupControllers.js";

router.post("/group/create", create)

router.get("/groups", getGroups)

export default router;