import { Request, Response, NextFunction } from 'express';

export const cacheControl = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'GET') {
      res.set('Cache-Control', `public, max-age=${duration}`);
    } else {
      res.set('Cache-Control', 'no-store');
    }
    next();
  };
}; 