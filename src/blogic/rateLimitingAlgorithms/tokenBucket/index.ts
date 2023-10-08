import { LogTypes, logger } from '../../../utils/logger';
import { TOKEN_BUCKET_CAPACITY, TOKEN_BUCKET_TTL } from '../../../config';

class TokenBucket {
  ipAddress: string;
  tokens: number;

  constructor(ipAddress: string) {
    this.ipAddress = ipAddress;
    this.tokens = TOKEN_BUCKET_CAPACITY;
    this.initializeTokenFeeder();
  }

  private initializeTokenFeeder() {
    setInterval(() => {
      if (this.tokens - TOKEN_BUCKET_CAPACITY < 0) {
        this.tokens++;
      }
    }, TOKEN_BUCKET_TTL);
  }
}

export class TokenBucketCollection {
  private static instance: TokenBucketCollection;
  private collection: TokenBucket[];
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor(ipAddress: string) {
    this.collection = new Array<TokenBucket>();
    this.createNewTokenBucket(ipAddress);
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(ipAddress: string): TokenBucketCollection {
    if (!TokenBucketCollection.instance) {
      logger(LogTypes.Info, `Creating a new instance of TokenBucketCollection for IP: '${ipAddress}'`);
      TokenBucketCollection.instance = new TokenBucketCollection(ipAddress);
    }

    return TokenBucketCollection.instance;
  }

  /**
   * Finally, any singleton should define some business logic, which can be
   * executed on its instance.
   */
  public createNewTokenBucket(ipAddress: string) {
    const tokenBucket = new TokenBucket(ipAddress);
    this.collection.push(tokenBucket);
    logger(
      LogTypes.Info,
      `Successfully created new token bucket, IP: '${tokenBucket.ipAddress}', TOKENS: '${tokenBucket.tokens}'`
    );
    return true;
  }

  public containsTokenBucket(ipAddress: string) {
    const rv = this.collection.find((tokenBucket) => tokenBucket.ipAddress === ipAddress);
    return rv === undefined ? false : true;
  }

  public removeTokensFromBucket(ipAddress: string, quantity: number): boolean {
    const rv = this.collection.find((tokenBucket) => tokenBucket.ipAddress === ipAddress);

    if (rv === undefined) {
      logger(
        LogTypes.Error,
        `Couldn't find tokenBucket with IP: '${ipAddress}' in COLLECTION: '${JSON.stringify(this.collection)}'`
      );
      return false;
    } else if (rv.tokens - quantity < 0) {
      logger(
        LogTypes.Warn,
        `Removing QUANTITY: '${quantity}' from TOKENS: '${rv.tokens}' creates an UNDERFLOW for COLLECTION: '${JSON.stringify(
          this.collection
        )}'`
      );
      return false;
    } else {
      rv.tokens -= quantity;
      return true;
    }
  }
}
