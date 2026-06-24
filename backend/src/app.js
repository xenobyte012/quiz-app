import express from "express";
import path from "path";
import cors from "cors";
import dashboardRoutes from "./routes/dashboard.route.js";
import quizRoutes from "./routes/quiz.route.js";

import resultRoutes from "./routes/result.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

const app = express();

app.use(express.json())


const allowedOrigins = [
  "https://quiz-app-silk-seven-86.vercel.app", // Your main production domain
  "http://localhost:5173"                       // Local development tracking
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);

      const isVercelBranch = origin.endsWith(".vercel.app") && origin.includes("xenobyte012s-projects");
      
      if (allowedOrigins.indexOf(origin) !== -1 || isVercelBranch) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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