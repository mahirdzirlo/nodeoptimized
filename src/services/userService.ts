import { Document, FilterQuery } from 'mongoose';
import User from '../models/User';
import logger from '../logger';

export class UserService {
  static async getUsers(query: FilterQuery<Document>, page: number, limit: number) {
    try {
      return await User.find(query)
        .select('name email')
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
        .hint({ email: 1, name: 1 }); // Use compound index
    } catch (error) {
      logger.error('Error in getUsers service:', error);
      throw error;
    }
  }
} 