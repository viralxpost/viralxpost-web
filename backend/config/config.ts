import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  geminiApi: process.env.GEMINI_API,
  frontendDomain: process.env.FRONTEND_DOMAIN || "https://www.viralxpost.xyz" || "https://viralxpost.xyz", 
};

export const config = Object.freeze(_config);
