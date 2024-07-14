import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  geminiApi: process.env.GEMINI_API,
};

export const config = Object.freeze(_config);
