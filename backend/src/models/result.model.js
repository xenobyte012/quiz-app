import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    answers: [
      {
        question: String,
        selectedAnswer: String,
        correctAnswer: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Result = mongoose.model("Result", resultSchema);
