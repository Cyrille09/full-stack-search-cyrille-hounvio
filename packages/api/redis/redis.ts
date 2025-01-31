import Redis from "ioredis";

const redis = new Redis(`${process.env.REDIS_URL}`);

/**
 * Get redis
 */
export async function get(key: string) {
  const result: any = await redis.get(key);
  return JSON.parse(result);
}

/**
 * Set redis
 */
export async function set(key: string, value: any, expiryTime?: any) {
  return redis.set(key, JSON.stringify(value), "EX", expiryTime);
}

/**
 * Delete redis
 */
export async function del(key: string) {
  //
  return await redis.del(key);
}

/**
 * Reset redis
 */
export async function reset() {
  return await redis.reset();
}
