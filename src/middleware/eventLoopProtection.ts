import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export class EventLoopMonitor {
  private static instance: EventLoopMonitor;
  private lastLoopTime: number = Date.now();
  private checkInterval: NodeJS.Timeout | null = null;
  private readonly threshold: number;
  private isBlocked: boolean = false;

  private constructor(threshold: number = 100) { // threshold in ms
    this.threshold = threshold;
    this.startMonitoring();
  }

  public static getInstance(threshold?: number): EventLoopMonitor {
    if (!EventLoopMonitor.instance) {
      EventLoopMonitor.instance = new EventLoopMonitor(threshold);
    }
    return EventLoopMonitor.instance;
  }

  private startMonitoring(): void {
    // Check event loop lag every 100ms
    this.checkInterval = setInterval(() => {
      const now = Date.now();
      const lag = now - this.lastLoopTime;
      
      // If lag is greater than threshold, consider event loop blocked
      this.isBlocked = lag > this.threshold;
      this.lastLoopTime = now;
    }, 100);

    // Prevent the interval from keeping the process alive
    if (this.checkInterval.unref) {
      this.checkInterval.unref();
    }
  }

  public isEventLoopBlocked(): boolean {
    return this.isBlocked;
  }

  public cleanup(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }
}

// Middleware to check event loop health
export const eventLoopProtection = (threshold: number = 100) => {
  const monitor = EventLoopMonitor.getInstance(threshold);

  return (req: Request, res: Response, next: NextFunction) => {
    if (monitor.isEventLoopBlocked()) {
      next(createHttpError(503, 'Service temporarily unavailable'));
    } else {
      next();
    }
  };
}; 