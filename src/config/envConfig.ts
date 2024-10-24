import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'], default: 'development' }),
    PORT: port({ default: 8080 }),
    MONGO_URI: str(),
    GOOGLE_CLIENT_ID: str(),
    JWT_SECRET: str(),
    GEMINI_API_KEY: str(),
});

export default env;