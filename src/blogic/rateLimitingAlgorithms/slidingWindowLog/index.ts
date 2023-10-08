import { LogTypes, logger } from '../../../utils/logger';
import { SLIDING_WINDOW_LOG_REQUEST_CAPACITY, SLIDING_WINDOW_LOG_WINDOW_SIZE } from '../../../config';

class Log {
  ipAddress: string;
  entries: Date[];

  constructor(ipAddress: string) {
    this.ipAddress = ipAddress;
    this.entries = new Array();
  }
}

export class SlidingWindowLog {
  private static instance: SlidingWindowLog;
  private collection: Log[];
  private windowSize: number;
  private capacity: number;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor(ipAddress: string) {
    this.windowSize = SLIDING_WINDOW_LOG_WINDOW_SIZE * 1000;
    this.capacity = SLIDING_WINDOW_LOG_REQUEST_CAPACITY;
    this.collection = new Array<Log>();
    this.createLog(ipAddress);
  }

  private cleanupEntries(entries: Date[]) {
    const currentTime = Number(new Date());
    while (entries.length > 0 && Number(entries[0]) < currentTime - this.windowSize) {
      entries.shift();
    }
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(ipAddress: string): SlidingWindowLog {
    if (!SlidingWindowLog.instance) {
      logger(LogTypes.Info, `Creating a new instance of SLIDING WINDOW LOG`);
      SlidingWindowLog.instance = new SlidingWindowLog(ipAddress);
    }

    return SlidingWindowLog.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public createLog(ipAddress: string) {
    const log = new Log(ipAddress);
    this.collection.push(log);
    logger(LogTypes.Info, `Successfully created new LOG, IP: '${log.ipAddress}', LOGS: '${log.entries}'`);
    return true;
  }

  public containsLog(ipAddress: string) {
    const log = this.collection.find((_) => _.ipAddress === ipAddress);
    return log === undefined ? false : true;
  }

  public appendEntry(ipAddress: string) {
    const log = this.collection.find((_) => _.ipAddress === ipAddress);

    if (log === undefined) {
      logger(LogTypes.Error, `Couldn't find log with IP: '${ipAddress}' in COLLECTION: '${JSON.stringify(this.collection)}'`);
      return false;
    }

    this.cleanupEntries(log.entries);

    if (log.entries.length >= this.capacity) {
      logger(
        LogTypes.Warn,
        `Appending an entry for IP: '${log.ipAddress}' in ENTRIES: '${
          log.entries
        }' creates an OVERFLOW for ENTRIES given, COLLECTION: '${JSON.stringify(this.collection)}'`
      );
      return false;
    } else {
      log.entries.push(new Date());
      return true;
    }
  }
}
