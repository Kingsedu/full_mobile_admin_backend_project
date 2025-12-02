"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const processEnv = process.env;
exports.ENV = {
    NODE_ENV: processEnv.NODE_ENV,
    PORT: processEnv.PORT,
    MONGO_URL: processEnv.MONGO_URL,
    CLERK_PUBLISHABLE_KEY: processEnv.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: processEnv.CLERK_SECRET_KEY,
    INNGEST_SIGN_UP_KEY: processEnv.INNGEST_SIGN_UP_KEY,
    CLOUDINARY_API_KEY: processEnv.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: processEnv.CLOUDINARY_API_SECRET,
    CLOUDIARY_NAME: processEnv.CLOUDIARY_NAME,
};
