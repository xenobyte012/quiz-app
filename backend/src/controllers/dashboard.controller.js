import { User } from "../models/user.model.js";
import { Quiz } from "../models/quiz.model.js";
import { Result } from "../models/result.model.js";

export const getTeacherDashboardSummary = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalQuizzes = await Quiz.countDocuments();

    const results = await Result.find({}, "percentage");
    const totalAttempts = results.length;

    const avgClassScore =
      totalAttempts > 0
        ? Math.round(
            results.reduce((sum, r) => sum + (r.percentage || 0), 0) /
              totalAttempts,
          )
        : 0;

    res.status(200).json({
      totalStudents,
      totalQuizzes,
      totalAttempts,
      avgClassScore,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      {
        $group: {
          _id: "$studentId",
          averageScore: { $avg: "$percentage" },
          attempts: { $sum: 1 },
          latestAttempt: { $max: "$createdAt" },
        },
      },
      {
        $sort: { averageScore: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    const enriched = await Promise.all(
      leaderboard.map(async (item) => {
        const student = await User.findById(item._id).select("username email");
        return {
          id: item._id,
          name: student?.username || "Unknown Student",
          email: student?.email || "",
          averageScore: Math.round(item.averageScore || 0),
          attempts: item.attempts,
        };
      }),
    );

    res.status(200).json({ leaderboard: enriched });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
