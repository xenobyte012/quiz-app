import { Router } from "express";
import { getTeacherAnalyticsOverview } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/overview", getTeacherAnalyticsOverview);

export default router;
