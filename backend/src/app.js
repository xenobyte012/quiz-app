import express from "express";
import path from "path";
import dashboardRoutes from "./routes/dashboard.route.js";
import quizRoutes from "./routes/quiz.route.js";

import resultRoutes from "./routes/result.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();

app.use(express.json())

app.use(
  cors({
    origin: ["https://quiz-ek4hethmb-xenobyte012s-projects.vercel.app"],
    credentials: true,
  }),
);

app.get("/api/v1/ping", (req, res) => {
  res.json({
    message: "Server is running",
  });
});
// routes import 
import userRouter from "./routes/user.route.js"

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/result", resultRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/analytics", analyticsRoutes);


// example route: http://localhost:5090/api/v1/users/register

export default app