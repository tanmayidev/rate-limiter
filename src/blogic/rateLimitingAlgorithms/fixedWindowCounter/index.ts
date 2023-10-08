import { LogTypes, logger } from '../../../utils/logger';
import { FIXED_WINDOW_COUNTER_CAPACITY, FIXED_WINDOW_COUNTER_WINDOW_SIZE } from '../../../config';

export class FixedWindowCounter {
  private static instance: FixedWindowCounter;
  private window_start: number;
  private window_end: number;
  private allowance: number;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.initializeWindow(new Date());
  }

  private initializeWindow(current_time: Date) {
    this.window_start = current_time.getSeconds();
    this.window_end = this.window_start + FIXED_WINDOW_COUNTER_WINDOW_SIZE;
    this.allowance = FIXED_WINDOW_COUNTER_CAPACITY;
    logger(
      LogTypes.Info,
      `Completed initializing window, WINDOW_START: '${this.window_start}', WINDOW_END: '${this.window_end}', ALLOWANCE: '${this.allowance}'`
    );
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): FixedWindowCounter {
    if (!FixedWindowCounter.instance) {
      logger(LogTypes.Info, `Creating a new instance of FIXED WINDOW COUNTER`);
      FixedWindowCounter.instance = new FixedWindowCounter();
    }

    return FixedWindowCounter.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public handle(reqDate: Date): boolean {
    const requestTimeInSeconds = reqDate.getSeconds();
    if (requestTimeInSeconds > this.window_end) {
      logger(
        LogTypes.Warn,
        `Window with WINDOW_START: '${this.window_start}', WINDOW_END: '${this.window_end}', ALLOWANCE: '${
          this.allowance
        }' has expired. Initializing new Window with REQ_DATE_ISO: ${reqDate.toISOString()}`
      );
      this.initializeWindow(reqDate);
    }

    if (this.allowance < 1) {
      logger(
        LogTypes.Warn,
        `Allowance for Window with WINDOW_START: '${this.window_start}', WINDOW_END: '${this.window_end}', ALLOWANCE: '${this.allowance}' has expired.`
      );
      return false;
    }

    this.allowance--;
    return true;
  }
}
