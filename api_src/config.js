import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';

export default {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: process.env.PORT || 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  },
  dbUrl: process.env.MONGODB_URI
};
