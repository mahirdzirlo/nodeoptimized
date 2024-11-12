import logger from '../logger';
import User from '../models/User';

export const createIndexes = async () => {
  try {
    logger.info('Creating database indexes...');

    // User collection indexes
    await User.collection.createIndexes([
      // Compound index for pagination
      {
        key: { 
          email: 1,
          name: 1 
        },
        name: 'email_name_index'
      },
      // Unique email index
      {
        key: { email: 1 },
        unique: true,
        name: 'email_unique'
      }
    ]);

    logger.info('Database indexes created successfully');
  } catch (error) {
    logger.error('Error creating database indexes:', error);
    throw error;
  }
}; 