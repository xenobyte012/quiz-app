import express from "express";
import path from "path";

import quizRoutes from "./routes/quiz.route.js";

import resultRoutes from "./routes/result.route.js";


const app = express();

app.use(express.json())

// routes import 
import userRouter from "./routes/user.route.js"

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/result", resultRoutes);


// example route: http://localhost:5090/api/v1/users/register

export default app