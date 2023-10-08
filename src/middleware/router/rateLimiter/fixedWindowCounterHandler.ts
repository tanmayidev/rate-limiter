import { FixedWindowCounter } from '../../../blogic/rateLimitingAlgorithms/fixedWindowCounter';

export const fixedWindowCounterHandler = (): boolean => {
  const fixedWindowCounter = FixedWindowCounter.getInstance();
  return fixedWindowCounter.handle(new Date());
};
