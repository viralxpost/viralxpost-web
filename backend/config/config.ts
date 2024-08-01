import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT || 5513,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  geminiApi: process.env.GEMINI_API,
  frontendDomain:
    process.env.FRONTEND_DOMAIN ||
    "https://www.viralxpost.xyz" ||
    "https://viralxpost.xyz",
  redisHost: process.env.REDIS_SOCKET_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPassword: process.env.REDIS_PASSWORD,
  expressSessionSecret: process.env.EXPRESS_SECRET,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleSecretKey: process.env.GOOGLE_SECRET_KEY,
  expressSecret: process.env.EXPRESS_SECRET,
  callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET,

};

export const config = Object.freeze(_config);
