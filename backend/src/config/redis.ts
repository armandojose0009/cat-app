import Redis from 'ioredis';

class RedisClient {
  private static instance: RedisClient | null = null;
  private client: Redis | null = null;

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  private constructor() {}

  public async connect(): Promise<void> {
    if (this.client) {
      console.log('Redis client is already connected');
      return;
    }

    const redisPort = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;
    this.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: redisPort
    });

    this.client.on('connect', () => {
      console.log('Connected to Redis successfully');
    });

    this.client.on('error', (error: Error) => {
      console.error('Error connecting to Redis:', error);
    });
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = null;
      console.log('Redis connection closed');
    }
  }

  public async setData(key: string, value: string): Promise<void> {
    if (!this.client) {
      throw new Error('Redis client is not connected');
    }
    await this.client.set(key, value);
  }

  public async getData(key: string): Promise<string | null> {
    if (!this.client) {
      throw new Error('Redis client is not connected');
    }
    return await this.client.get(key);
  }
}

export default RedisClient;
