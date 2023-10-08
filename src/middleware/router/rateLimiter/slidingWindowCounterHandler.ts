import { SlidingWindowCounter } from '../../../blogic/rateLimitingAlgorithms/slidingWindowCounter';

export const SlidingWindowCounterHandler = (): boolean => {
  const fixedWindowCounter = SlidingWindowCounter.getInstance();
  return fixedWindowCounter.handle(new Date());
};
