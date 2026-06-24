import { Quiz } from "../models/quiz.model.js";
import { Result } from "../models/result.model.js"; // Ensure this import is here

// 1. Create a new quiz
const createQuiz = async (req, res) => {
  try {
    const { title, subject, questions, teacherId } = req.body;

    if (!title || !subject || !questions.length) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const quiz = await Quiz.create({
      title,
      subject,
      questions,
      createdBy: teacherId,
    });

    return res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// 2. Get all raw quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ quizzes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Get quiz details by ID
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. NEW: Get customized quiz feed for a student with completion markers
const getStudentQuizzes = async (req, res) => {
  try {
    const { studentId } = req.params;

    const quizzes = await Quiz.find();
    const completed = await Result.find({ studentId });

    const completedIds = completed.map((result) => result.quizId.toString());

    const formatted = quizzes.map((quiz) => ({
      ...quiz.toObject(),
      completed: completedIds.includes(quiz._id.toString()),
    }));

    res.status(200).json({
      quizzes: formatted,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
 const getStudentResults = async (req, res) => {
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

export { createQuiz, getAllQuizzes, getQuizById, getStudentQuizzes };
