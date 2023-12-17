import IORedis from "ioredis";
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export class RedisConfig {
  private redisConnection: any;
  constructor() {
    this.connect();
  }

  getRedisConnection() {
    return this.redisConnection;
  }

  protected connect() {
    try {
      this.redisConnection = new IORedis({
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
      });

      this.redisConnection.on("error", (error) => {
        console.error("Redis connection error", error);
        process.exit(1);
      });

      this.redisConnection.on("exit", () => {
        console.error(
          "Exiting...listener count",
          this.redisConnection.listenerCount("error"),
        );
      });
    } catch (err) {
      console.error(`Cant create Redis instance: ${err}`);
    }
  }
  public async getOrSetCache(contentType, key, callback) {
    const existedData = await this.redisConnection.hexists(contentType, key);
    if (existedData) {
      const cachedData = await this.redisConnection.hget(contentType, key);
      console.log("Cache hits in:", contentType, key);
      return JSON.parse(cachedData);
    }
    const freshData = await callback();
    console.log("Cache miss in:", contentType, key);
    this.redisConnection.hset(contentType, key, JSON.stringify(freshData));
    return freshData;
  }
}

export const redis = new RedisConfig();
export const redisConnection = redis.getRedisConnection();
