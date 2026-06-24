import { Router } from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getStudentQuizzes, // Added here
} from "../controllers/quiz.controller.js";

const router = Router();

router.post("/create", createQuiz);
router.get("/all", getAllQuizzes);
router.get("/student/:studentId", getStudentQuizzes); // Added here
router.get("/:id", getQuizById);

export default router;
