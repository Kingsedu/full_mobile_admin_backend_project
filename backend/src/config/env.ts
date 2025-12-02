import dotenv from 'dotenv';
dotenv.config();

const processEnv = process.env;

export const ENV = {
  NODE_ENV: processEnv.NODE_ENV,
  PORT: processEnv.PORT,
  DB_URL: processEnv.MONGO_URL,
};
