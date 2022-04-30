import { Router } from "express";
import { addReview, getReviews } from "../controllers/reviewsControllers";

const router = Router();

router.get("/:p_id", (req, res) => {
    getReviews(req, res);
})

router.post("/", (req, res) => {
    addReview(req, res);
})
