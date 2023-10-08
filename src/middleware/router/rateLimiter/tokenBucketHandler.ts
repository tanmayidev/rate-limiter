import { TokenBucketCollection } from '../../../blogic/rateLimitingAlgorithms/tokenBucket';

export const tokenBucketHandler = (ipAddress: string): boolean => {
  const tokenBucketCollection = TokenBucketCollection.getInstance(ipAddress);
  const tokenBucketExists = tokenBucketCollection.containsTokenBucket(ipAddress);
  if (!tokenBucketExists) {
    return tokenBucketCollection.createNewTokenBucket(ipAddress);
  } else {
    return tokenBucketCollection.removeTokensFromBucket(ipAddress, 1);
  }
};
