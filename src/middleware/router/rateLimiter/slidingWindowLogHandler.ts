import { SlidingWindowLog } from '../../../blogic/rateLimitingAlgorithms/slidingWindowLog';

export const slidingWindowLogHandler = (ipAddress: string) => {
  const slidingWindowLogCollection = SlidingWindowLog.getInstance(ipAddress);
  const logExists = slidingWindowLogCollection.containsLog(ipAddress);
  if (!logExists) {
    return slidingWindowLogCollection.createLog(ipAddress);
  } else {
    return slidingWindowLogCollection.appendEntry(ipAddress);
  }
};
