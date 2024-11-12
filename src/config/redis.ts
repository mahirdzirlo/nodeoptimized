import { createClient } from 'redis';
import logger from '../logger';

// Create a singleton Redis client
class RedisManager {
  private static instance: RedisManager;
  private client: ReturnType<typeof createClient>;
  private isInitialized: boolean = false;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      socket: {
        reconnectStrategy: (retries) => {
          return Math.min(retries * 50, 5000);
        }
      }
    });

    // Handle Redis events
    this.client.on('error', (err) => {
      logger.error(`Redis error (Process ${process.pid}):`, err);
    });

    this.client.on('connect', () => {
      logger.info(`Redis connected (Process ${process.pid})`);
    });

    this.client.on('reconnecting', () => {
      logger.info(`Redis reconnecting (Process ${process.pid})`);
    });
  }

  public static getInstance(): RedisManager {
    if (!RedisManager.instance) {
      RedisManager.instance = new RedisManager();
    }
    return RedisManager.instance;
  }

  public async connect(): Promise<void> {
    if (!this.isInitialized) {
      try {
        await this.client.connect();
        this.isInitialized = true;
      } catch (error) {
        logger.error(`Redis connection error (Process ${process.pid}):`, error);
        throw error;
      }
    }
  }

  public getClient() {
    return this.client;
  }
}

export const redisManager = RedisManager.getInstance();
export default redisManager.getClient(); 