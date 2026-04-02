import app from "./app.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down...");
      server.close(() => process.exit(0));
    });

    process.on("SIGINT", () => {
      console.log("SIGINT received. Shutting down...");
      server.close(() => process.exit(0));
    });

    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION 💥", err);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error("Failed to start server 💥", error);
    process.exit(1);
  }
};

startServer();
