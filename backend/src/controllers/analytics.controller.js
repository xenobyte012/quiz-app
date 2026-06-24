import { Quiz } from "../models/quiz.model.js";
import { Result } from "../models/result.model.js";
import { User } from "../models/user.model.js";

const RANGE_MAP = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
  all: null,
};

const getMatchFilter = (range) => {
  const days = RANGE_MAP[range] ?? 30;

  if (!days) return {};

  return {
    createdAt: {
      $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
    },
  };
};

const getResultPercentage = (result) => {
  if (typeof result.percentage === "number") return result.percentage;
  if (result.totalQuestions > 0) {
    return Math.round(
      (Number(result.score || 0) / result.totalQuestions) * 100,
    );
  }
  return 0;
};

export const getTeacherAnalyticsOverview = async (req, res) => {
  try {
    const range = req.query.range || "30d";
    const match = getMatchFilter(range);

    const [totalStudents, totalQuizzes, allResults] = await Promise.all([
      User.countDocuments({ role: "student" }),
      Quiz.countDocuments(),
      Result.find(match)
        .populate("studentId", "username email")
        .populate("quizId", "title subject")
        .sort({ createdAt: -1 }),
    ]);

    const totalAttempts = allResults.length;
    const scores = allResults.map(getResultPercentage);

    const averageScore = totalAttempts
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) / totalAttempts,
        )
      : 0;

    const passCount = scores.filter((score) => score >= 50).length;
    const passRate = totalAttempts
      ? Math.round((passCount / totalAttempts) * 100)
      : 0;
    const failRate = totalAttempts ? 100 - passRate : 0;
    const highestScore = totalAttempts ? Math.round(Math.max(...scores)) : 0;
    const lowestScore = totalAttempts ? Math.round(Math.min(...scores)) : 0;

    const recentResults = allResults.slice(0, 10).map((result) => {
      const percentage = getResultPercentage(result);

      return {
        id: result._id,
        studentName:
          result.studentId?.username || result.studentId?.fullName || "Unknown",
        studentEmail: result.studentId?.email || "",
        quizTitle: result.quizId?.title || "Unknown Quiz",
        quizSubject: result.quizId?.subject || "",
        score: Number(result.score || 0),
        totalQuestions: Number(result.totalQuestions || 0),
        percentage,
        createdAt: result.createdAt,
        passed: percentage >= 50,
      };
    });

    const leaderboardAgg = await Result.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$studentId",
          averageScore: { $avg: "$percentage" },
          attempts: { $sum: 1 },
          latestAttempt: { $max: "$createdAt" },
        },
      },
      { $sort: { averageScore: -1 } },
      { $limit: 10 },
    ]);

    const leaderboardStudentIds = leaderboardAgg.map((row) => row._id);
    const leaderboardStudents = await User.find({
      _id: { $in: leaderboardStudentIds },
    }).select("username email");

    const leaderboardStudentMap = new Map(
      leaderboardStudents.map((student) => [String(student._id), student]),
    );

    const leaderboard = leaderboardAgg.map((row) => {
      const student = leaderboardStudentMap.get(String(row._id));

      return {
        id: row._id,
        name: student?.username || "Unknown Student",
        email: student?.email || "",
        averageScore: Math.round(row.averageScore || 0),
        attempts: row.attempts || 0,
        latestAttempt: row.latestAttempt,
      };
    });

    const quizAgg = await Result.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$quizId",
          attempts: { $sum: 1 },
          averageScore: { $avg: "$percentage" },
          highestScore: { $max: "$percentage" },
          lowestScore: { $min: "$percentage" },
          passCount: {
            $sum: {
              $cond: [{ $gte: ["$percentage", 50] }, 1, 0],
            },
          },
        },
      },
      { $sort: { averageScore: -1 } },
    ]);

    const quizIds = quizAgg.map((row) => row._id);
    const quizDocs = await Quiz.find({ _id: { $in: quizIds } }).select(
      "title subject",
    );

    const quizMap = new Map(quizDocs.map((quiz) => [String(quiz._id), quiz]));

    const quizPerformance = quizAgg.map((row) => {
      const quiz = quizMap.get(String(row._id));
      const passRateValue = row.attempts
        ? Math.round((row.passCount / row.attempts) * 100)
        : 0;

      return {
        id: row._id,
        title: quiz?.title || "Unknown Quiz",
        subject: quiz?.subject || "",
        attempts: row.attempts || 0,
        averageScore: Math.round(row.averageScore || 0),
        highestScore: Math.round(row.highestScore || 0),
        lowestScore: Math.round(row.lowestScore || 0),
        passRate: passRateValue,
      };
    });

    const trendAgg = await Result.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          averageScore: { $avg: "$percentage" },
          attempts: { $sum: 1 },
          passCount: {
            $sum: {
              $cond: [{ $gte: ["$percentage", 50] }, 1, 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const trend = trendAgg.map((row) => ({
      date: row._id,
      averageScore: Math.round(row.averageScore || 0),
      attempts: row.attempts || 0,
      passRate: row.attempts
        ? Math.round((row.passCount / row.attempts) * 100)
        : 0,
    }));

    const mostAttemptedQuiz =
      quizPerformance.reduce((best, current) => {
        if (!best) return current;
        return current.attempts > best.attempts ? current : best;
      }, null) || null;

    const hardestQuiz =
      quizPerformance.reduce((worst, current) => {
        if (!worst) return current;
        return current.averageScore < worst.averageScore ? current : worst;
      }, null) || null;

    res.status(200).json({
      summary: {
        totalStudents,
        totalQuizzes,
        totalAttempts,
        averageScore,
        passRate,
        failRate,
        highestScore,
        lowestScore,
        mostAttemptedQuiz,
        hardestQuiz,
      },
      trend,
      quizPerformance,
      leaderboard,
      recentResults,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
