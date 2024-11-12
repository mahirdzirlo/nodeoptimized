import express from "express";
import timeout from "connect-timeout";
import { connectDB } from "./config";
import userRoutes from "./routes/userRoutes";
import timeoutHandler from "./middleware/timeoutHandler";
import { errorHandler } from "./middleware/errorHandler";
import logger from "./logger";
import { redisManager } from './config/redis';


const app = express();
connectDB();

// Initialize Redis connection
const initializeRedis = async () => {
  try {
    await redisManager.connect();
    logger.info(`Redis initialized for PM2 instance ${process.pid}`);
  } catch (error) {
    logger.error(`Failed to initialize Redis for PM2 instance ${process.pid}:`, error);
    process.exit(1);
  }
};

// Initialize your app
const initializeApp = async () => {
  await initializeRedis();
  app.use(express.json());
  app.use(timeout("10s"));
  app.use(timeoutHandler);
  // app.use(compression());
  

  
  app.use("/api", userRoutes);
  app.use(errorHandler);
  app.listen(3000, () => {
    logger.info(`Server running on port 3000`);
  });
};

initializeApp();

export default app;
