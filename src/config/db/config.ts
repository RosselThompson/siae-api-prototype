import { registerAs } from '@nestjs/config';
export default registerAs('mssql', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
}));
