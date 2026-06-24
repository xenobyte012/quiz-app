import { Router } from "express";
import {
  submitQuiz,
  getStudentResults,
} from "../controllers/result.controller.js";

const router = Router();

router.post("/submit", submitQuiz);
router.get("/student/:studentId", getStudentResults);

export default router;
