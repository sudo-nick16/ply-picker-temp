import { Router } from "express";
const router = Router();

import { create, getGroupById, getGroups} from "../controllers/groupControllers.js";

router.post("/group/create", create)

router.get("/groups", getGroups)

router.get("/groups/:groupID", getGroupById)

export default router;