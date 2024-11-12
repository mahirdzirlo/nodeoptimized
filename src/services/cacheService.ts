import redisClient from '../config/redis';
import logger from '../logger';

export class CacheService {
  private static readonly DEFAULT_TTL = 300; // 5 minutes

  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Cache get error (Process ${process.pid}):`, error);
      return null;
    }
  }

  static async set(key: string, value: any, ttl: number = this.DEFAULT_TTL): Promise<void> {
    try {
      await redisClient.setEx(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.error(`Cache set error (Process ${process.pid}):`, error);
    }
  }

  static async delete(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      logger.error(`Cache delete error (Process ${process.pid}):`, error);
    }
  }

  static async clearPattern(pattern: string): Promise<void> {
    try {
      for await (const key of redisClient.scanIterator({ MATCH: pattern })) {
        await redisClient.del(key);
      }
    } catch (error) {
      logger.error(`Cache clear pattern error (Process ${process.pid}):`, error);
    }
  }
} 