import { Request, Response } from "express";
import User from "../models/User";
import logger from "../logger";
import { CacheService } from '../services/cacheService';

export const getUsers = async (
  req: Request,
  res: Response,
 
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const cacheKey = `users:${page}:${limit}`;
    const cachedData = await CacheService.get<any[]>(cacheKey);
    if (cachedData !== null) {
      logger.info(`Cache hit for ${cacheKey} (Process ${process.pid})`);
      return res.status(200).json(cachedData);
    }


    const users = await User.find({})
      .select("name email")
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .lean();

    // Store in cache
    await CacheService.set(cacheKey, users);
    
    logger.info(`Cache miss for ${cacheKey} (Process ${process.pid})`);
    return res.status(200).json(users);
  } catch (error: any) {
    logger.error(`Error in getUsers controller (Process ${process.pid}): ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error", message: "An unknown error occurred." });
  }
};
