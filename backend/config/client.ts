import { createClient } from "redis";
import { config } from "../config/config";

// Redis client setup
const client = createClient({
  password: config.redisPassword,
  socket: {
    host: config.redisHost,
    port: Number(config.redisPort),
    connectTimeout: 20000,
  },
});

const connectWithRetry = async (retries: number = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await client.connect();
      console.log("Connected to Redis server successfully");
      break;
    } catch (error) {
      console.error("Redis connection attempt failed:", error);
      if (i < retries - 1) {
        console.log(`Retrying connection (${i + 1}/${retries})...`);
        await new Promise((res) => setTimeout(res, 2000));
      } else {
        console.error("Failed to connect to Redis after multiple attempts");
      }
    }
  }
};

client.on("error", (err: string) => console.error("Redis Client Error", err));

connectWithRetry();

export default client;
