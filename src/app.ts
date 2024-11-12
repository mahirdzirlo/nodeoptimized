import express from "express";
import { connectDB } from "./config";
import userRoutes from "./routes/userRoutes";
import logger from "./logger";
import { redisManager } from './config/redis';
import { eventLoopProtection, EventLoopMonitor } from './middleware/eventLoopProtection';


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
  app.use(eventLoopProtection(1500)); // 100ms threshold
  app.use("/api", userRoutes);
  app.listen(3000, () => {
    logger.info(`Server running on port 3000`);
  });

 
  process.on('SIGTERM', () => {
    EventLoopMonitor.getInstance().cleanup();
   
  });
};

initializeApp();

export default app;
