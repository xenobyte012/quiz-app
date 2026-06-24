import { Router } from "express";
import {
  getTeacherDashboardSummary,
  getLeaderboard,
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/summary", getTeacherDashboardSummary);
router.get("/leaderboard", getLeaderboard);

export default router;
