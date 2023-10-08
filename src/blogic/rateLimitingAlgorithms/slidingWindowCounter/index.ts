import { LogTypes, logger } from '../../../utils/logger';
import { SLIDING_WINDOW_COUNTER_CAPACITY, SLIDING_WINDOW_COUNTER_WINDOW_SIZE } from '../../../config';

export class SlidingWindowCounter {
  private static instance: SlidingWindowCounter;
  private windowSize: number;
  private capacity: number;
  private currentCount: number;
  private prevCount: number;
  private currentTime: Date;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.windowSize = SLIDING_WINDOW_COUNTER_WINDOW_SIZE * 1000;
    this.capacity = SLIDING_WINDOW_COUNTER_CAPACITY;
    this.currentCount = 0;
    this.prevCount = 0;
    this.currentTime = new Date();
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): SlidingWindowCounter {
    if (!SlidingWindowCounter.instance) {
      logger(LogTypes.Info, `Creating a new instance of SLIDING WINDOW LOG`);
      SlidingWindowCounter.instance = new SlidingWindowCounter();
    }

    return SlidingWindowCounter.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public handle(now: Date): boolean {
    if (Number(now) - Number(this.currentTime) > this.windowSize) {
      this.currentTime = now;
      this.prevCount = this.currentCount;
      this.currentCount = 0;
    }

    const effectiveCount =
      (this.prevCount * (this.windowSize - (Number(now) - Number(this.currentTime)))) / this.windowSize + this.currentCount;

    if (effectiveCount >= this.capacity) {
      logger(LogTypes.Warn, `EFFECTIVE_COUNT: ${effectiveCount} is higher than/equal to CAPACITY: ${this.capacity}`);
      return false;
    } else {
      logger(LogTypes.Info, `EFFECTIVE_COUNT: ${effectiveCount} is lesser than CAPACITY: ${this.capacity}`);
      this.currentCount++;
      return true;
    }
  }
}
