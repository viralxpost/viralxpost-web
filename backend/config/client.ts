import { createClient } from 'redis';
import { config } from '../config/config';


// Redis client setup

const client = createClient({
  password: config.redisPassword,
  socket: {
    host: config.redisHost,
    port: Number(config.redisPort),
  },
});

client.connect();

client.on('error', (err: string) => console.error('Redis Client Error', err));

export default client;
