"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async (url) => {
    try {
        if (!url) {
            throw new Error('the connection string is not available');
        }
        const connect = await mongoose_1.default.connect(url);
        console.log('connected to the database');
        return connect;
    }
    catch (e) {
        console.error(e?.message);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
