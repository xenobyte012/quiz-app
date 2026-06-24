import { Quiz } from "../models/quiz.model.js";
import { Result } from "../models/result.model.js";

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, studentId, answers } = req.body;

    // Prevent retake
    const existingResult = await Result.findOne({
      studentId,
      quizId,
    });

    if (existingResult) {
      return res.status(400).json({
        message: "You have already taken this quiz",
      });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    let score = 0;

    const results = quiz.questions.map((question, index) => {
      const selectedAnswer = answers[index];

      if (selectedAnswer === question.correctAnswer) {
        score++;
      }

      return {
        question: question.question,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
      };
    });

    const percentage = (score / quiz.questions.length) * 100;

    const result = await Result.create({
      studentId,
      quizId,
      score,
      percentage,
      totalQuestions: quiz.questions.length,
      answers: results,
    });

    res.status(201).json({
      message: "Quiz submitted",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    const results = await Result.find({
      studentId,
    }).populate("quizId", "title subject");

    res.status(200).json({
      results,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};