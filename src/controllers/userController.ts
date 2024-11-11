// src/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import logger from "../logger";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find({})
      .select("name email") // Projection to return only specific fields
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .lean();
    logger.info(`Fetched users`);
    res.status(200).json(users);
  } catch (error: any) {
    logger.error(`Error in getUsers controller: ${error.message}`);
    next(error); // Pass the error to the global error handler
  }
};
