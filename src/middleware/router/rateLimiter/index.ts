import { LogTypes, logger } from '../../../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { tokenBucketHandler } from './tokenBucketHandler';
import { fixedWindowCounterHandler } from './fixedWindowCounterHandler';
import { slidingWindowLogHandler } from './slidingWindowLogHandler';
import { SlidingWindowCounterHandler } from './slidingWindowCounterHandler';

export enum RateLimitingAlgorithm {
  TokenBucket,
  FixedWindowCounter,
  SlidingWindowLog,
  SlidingWindowCounter,
}

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  logger(LogTypes.Info, `Rate Limiter triggered for URL: ${req.originalUrl}`);

  const requestedAlgo = Number(req.get('rate-limiting-algo') ?? 0) as RateLimitingAlgorithm;

  switch (requestedAlgo) {
    case RateLimitingAlgorithm.TokenBucket: {
      const ipAddress = req.get('origin-ipaddress');

      logger(LogTypes.Info, `Request is being rate-limited using TokenBucket Algorithm for IP: '${ipAddress}'`);

      tokenBucketHandler(ipAddress) ? next() : res.status(429).send(`Too many requests, please try again after sometime.`);

      break;
    }

    case RateLimitingAlgorithm.FixedWindowCounter: {
      const ipAddress = req.get('origin-ipaddress');

      logger(LogTypes.Info, `Request is being rate-limited using TokenBucket Algorithm for IP: '${ipAddress}'`);

      fixedWindowCounterHandler() ? next() : res.status(429).send(`Too many requests, please try again after sometime.`);

      break;
    }

    case RateLimitingAlgorithm.SlidingWindowLog: {
      const ipAddress = req.get('origin-ipaddress');

      logger(LogTypes.Info, `Request is being rate-limited using SlidingWindowLog Algorithm for IP: '${ipAddress}'`);

      slidingWindowLogHandler(ipAddress) ? next() : res.status(429).send(`Too many requests, please try again after sometime.`);

      break;
    }

    case RateLimitingAlgorithm.SlidingWindowCounter: {
      const ipAddress = req.get('origin-ipaddress');

      logger(LogTypes.Info, `Request is being rate-limited using SlidingWindowCounter Algorithm for IP: '${ipAddress}'`);

      SlidingWindowCounterHandler() ? next() : res.status(429).send(`Too many requests, please try again after sometime.`);

      break;
    }

    default: {
      logger(LogTypes.Error, `Bad-Request! Requested unknown Rate-Limiting-Algorithm: ${requestedAlgo}.`);
      res.status(400).send(`Unknown Requested-Algorithm: ${requestedAlgo} requested.`);
    }
  }
};
