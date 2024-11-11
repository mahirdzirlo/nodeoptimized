// src/app.ts
import express from "express";

import timeout from "connect-timeout";
import { connectDB } from "./config";
import userRoutes from "./routes/userRoutes";
import timeoutHandler from "./middleware/timeoutHandler";
import { errorHandler } from "./middleware/errorHandler";
import logger from "./logger";
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(timeout("10s"));
app.use(timeoutHandler);
app.use("/api", userRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
