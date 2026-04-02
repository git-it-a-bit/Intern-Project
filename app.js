import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import limiter from "./middlewares/globalRateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";

import userRoute from "./routes/user.routes.js";
import authRoute from "./routes/authentication.routes.js";
import recordRoute from "./routes/record.routes.js";
import dashboardRoute from "./routes/dashboard.routes.js";

const app = express();

// --- Core Middlewares ---
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

// --- Security / Rate Limiting ---
app.use(limiter);

// --- Routes ---
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/records", recordRoute);
app.use("/api/dashboard", dashboardRoute);

// --- Health Check ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

app.get("/", (req, res) => {
  res.send("Server is Running 🫂");
});

app.use(errorHandler);

export default app;
