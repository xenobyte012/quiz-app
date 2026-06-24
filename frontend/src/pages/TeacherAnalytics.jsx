import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Badge,
  BarChart3,
  BookOpen,
  CircleCheckBig,
  GraduationCap,
  RefreshCcw,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TeacherAnalytics() {
  const navigate = useNavigate();

  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    summary: {
      totalStudents: 0,
      totalQuizzes: 0,
      totalAttempts: 0,
      averageScore: 0,
      passRate: 0,
      failRate: 0,
      highestScore: 0,
      lowestScore: 0,
      mostAttemptedQuiz: null,
      hardestQuiz: null,
    },
    trend: [],
    quizPerformance: [],
    leaderboard: [],
    recentResults: [],
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const teacherName = user.username || user.fullName || "Teacher";

  useEffect(() => {
    fetchAnalytics();
  }, [range]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/analytics/overview?range=${range}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load analytics");
      }

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const trendData = useMemo(() => {
    return analytics.trend.map((item) => ({
      ...item,
      label: item.date,
    }));
  }, [analytics.trend]);

  const passFailData = useMemo(() => {
    return [
      { name: "Pass", value: analytics.summary.passRate },
      { name: "Fail", value: analytics.summary.failRate },
    ];
  }, [analytics.summary.passRate, analytics.summary.failRate]);

  const quizChartData = useMemo(() => {
    return analytics.quizPerformance.slice(0, 8).map((quiz) => ({
      title:
        quiz.title.length > 18 ? `${quiz.title.slice(0, 18)}...` : quiz.title,
      averageScore: quiz.averageScore,
    }));
  }, [analytics.quizPerformance]);

  const formatDate = (dateValue) => {
    if (!dateValue) return "Recent";

    return new Date(dateValue).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statCards = [
    {
      title: "Total students",
      value: analytics.summary.totalStudents,
      icon: Users,
      tone: "text-slate-900",
    },
    {
      title: "Quizzes created",
      value: analytics.summary.totalQuizzes,
      icon: BookOpen,
      tone: "text-slate-900",
    },
    {
      title: "Quiz attempts",
      value: analytics.summary.totalAttempts,
      icon: BarChart3,
      tone: "text-slate-900",
    },
    {
      title: "Average score",
      value: `${analytics.summary.averageScore}%`,
      icon: TrendingUp,
      tone: "text-emerald-600",
    },
    {
      title: "Pass rate",
      value: `${analytics.summary.passRate}%`,
      icon: CircleCheckBig,
      tone: "text-emerald-600",
    },
    {
      title: "Highest score",
      value: `${analytics.summary.highestScore}%`,
      icon: GraduationCap,
      tone: "text-cyan-600",
    },
    {
      title: "Lowest score",
      value: `${analytics.summary.lowestScore}%`,
      icon: Target,
      tone: "text-rose-600",
    },
    {
      title: "Fail rate",
      value: `${analytics.summary.failRate}%`,
      icon: Badge,
      tone: "text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      <Navbar />
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm border border-slate-200 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Teacher analytics
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">
              Welcome, {teacherName}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Live performance analytics for tests, learners, and class trends.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-2xl">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => navigate("/create-quiz")}
              className="rounded-2xl bg-emerald-600 hover:bg-emerald-700"
            >
              Create quiz
            </Button>

            <Button
              variant="outline"
              onClick={fetchAnalytics}
              className="rounded-2xl gap-2"
            >
              <RefreshCcw size={16} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className="rounded-3xl border-slate-200 shadow-sm"
              >
                <CardContent className="p-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>
                    <p className={`mt-2 text-3xl font-black ${card.tone}`}>
                      {loading ? "..." : card.value}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-3">
                    <Icon size={20} className="text-slate-700" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-white p-1 shadow-sm border border-slate-200">
            <TabsTrigger value="overview" className="rounded-xl">
              Overview
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="rounded-xl">
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="learners" className="rounded-xl">
              Learners
            </TabsTrigger>
            <TabsTrigger value="results" className="rounded-xl">
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-2 rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Average score trend</CardTitle>
                  <CardDescription>
                    How class performance changed over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px] w-full">
                    {loading ? (
                      <div className="h-full rounded-2xl bg-slate-50 animate-pulse" />
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="averageScore"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Pass vs fail</CardTitle>
                  <CardDescription>Overall class split.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px] w-full">
                    {loading ? (
                      <div className="h-full rounded-2xl bg-slate-50 animate-pulse" />
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={passFailData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={110}
                            innerRadius={65}
                            paddingAngle={4}
                          >
                            {passFailData.map((entry, index) => (
                              <Cell
                                key={entry.name}
                                fill={index === 0 ? "#10b981" : "#ef4444"}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-emerald-700 font-semibold">
                        Pass rate
                      </p>
                      <p className="text-2xl font-black text-emerald-700 mt-1">
                        {analytics.summary.passRate}%
                      </p>
                    </div>
                    <div className="rounded-2xl bg-rose-50 p-4">
                      <p className="text-rose-700 font-semibold">Fail rate</p>
                      <p className="text-2xl font-black text-rose-700 mt-1">
                        {analytics.summary.failRate}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quizzes" className="mt-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Quiz performance</CardTitle>
                  <CardDescription>Average score per quiz.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px] w-full">
                    {loading ? (
                      <div className="h-full rounded-2xl bg-slate-50 animate-pulse" />
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={quizChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="title" tick={{ fontSize: 12 }} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar
                            dataKey="averageScore"
                            fill="#0f172a"
                            radius={[12, 12, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Quiz summary</CardTitle>
                  <CardDescription>
                    Pass rate, attempts, and score spread.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="space-y-3">
                      <div className="h-16 rounded-2xl bg-slate-50 animate-pulse" />
                      <div className="h-16 rounded-2xl bg-slate-50 animate-pulse" />
                      <div className="h-16 rounded-2xl bg-slate-50 animate-pulse" />
                    </div>
                  ) : analytics.quizPerformance.length === 0 ? (
                    <p className="text-slate-500">No quiz results yet.</p>
                  ) : (
                    analytics.quizPerformance.map((quiz) => (
                      <div
                        key={quiz.id}
                        className="rounded-2xl border border-slate-200 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-bold text-slate-900">
                              {quiz.title}
                            </p>
                            <p className="text-xs text-slate-500">
                              {quiz.subject}
                            </p>
                          </div>
                          <Badge variant="secondary" className="rounded-full">
                            {quiz.attempts} attempts
                          </Badge>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-slate-500">Pass rate</span>
                            <span className="font-semibold">
                              {quiz.passRate}%
                            </span>
                          </div>
                          <Progress value={quiz.passRate} className="h-2" />
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                          <div className="rounded-xl bg-slate-50 p-3">
                            <p className="text-slate-500 text-xs">Avg</p>
                            <p className="font-bold">{quiz.averageScore}%</p>
                          </div>
                          <div className="rounded-xl bg-slate-50 p-3">
                            <p className="text-slate-500 text-xs">High</p>
                            <p className="font-bold">{quiz.highestScore}%</p>
                          </div>
                          <div className="rounded-xl bg-slate-50 p-3">
                            <p className="text-slate-500 text-xs">Low</p>
                            <p className="font-bold">{quiz.lowestScore}%</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learners" className="mt-6">
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>
                  Top learners ranked by average score.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Learner</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead>Average score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-8 text-slate-500">
                          Loading leaderboard...
                        </TableCell>
                      </TableRow>
                    ) : analytics.leaderboard.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-8 text-slate-500">
                          No leaderboard data yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      analytics.leaderboard.map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-bold">
                            #{index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {student.name}
                          </TableCell>
                          <TableCell className="text-slate-500">
                            {student.email}
                          </TableCell>
                          <TableCell>{student.attempts}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                student.averageScore >= 80
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                                  : student.averageScore >= 50
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                    : "bg-rose-100 text-rose-700 hover:bg-rose-100"
                              }
                            >
                              {student.averageScore}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Recent results</CardTitle>
                <CardDescription>
                  Latest submissions from learners.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-16 rounded-2xl bg-slate-50 animate-pulse" />
                    <div className="h-16 rounded-2xl bg-slate-50 animate-pulse" />
                  </div>
                ) : analytics.recentResults.length === 0 ? (
                  <p className="text-slate-500">No recent results yet.</p>
                ) : (
                  analytics.recentResults.map((result, index) => (
                    <div
                      key={result.id}
                      className="rounded-2xl border border-slate-200 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {result.studentName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {result.quizTitle} · {result.quizSubject}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {formatDate(result.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            result.passed
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                              : "bg-rose-100 text-rose-700 hover:bg-rose-100"
                          }
                        >
                          {result.passed ? "Pass" : "Fail"}
                        </Badge>

                        <div className="text-right min-w-[90px]">
                          <p className="text-xl font-black text-slate-900">
                            {result.percentage}%
                          </p>
                          <p className="text-xs text-slate-500">
                            {result.score}/{result.totalQuestions}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Key insights</CardTitle>
              <CardDescription>
                Quick teaching decisions at a glance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Most attempted quiz</p>
                <p className="font-bold text-slate-900 mt-1">
                  {analytics.summary.mostAttemptedQuiz?.title || "No data"}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Hardest quiz</p>
                <p className="font-bold text-slate-900 mt-1">
                  {analytics.summary.hardestQuiz?.title || "No data"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle>Performance snapshot</CardTitle>
              <CardDescription>
                Use this for intervention and extra support.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Average class score
                </span>
                <span className="font-bold">
                  {analytics.summary.averageScore}%
                </span>
              </div>
              <Progress
                value={analytics.summary.averageScore}
                className="h-2"
              />

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Pass rate</span>
                <span className="font-bold">{analytics.summary.passRate}%</span>
              </div>
              <Progress value={analytics.summary.passRate} className="h-2" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
