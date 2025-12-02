"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const db_mongoose_1 = require("./db/db.mongoose");
const express_2 = require("@clerk/express");
const express_3 = require("inngest/express");
// import { inngest } from './lib/inngest';
const inngest_1 = require("./lib/inngest");
// import { fileURLToPath } from 'url';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_2.clerkMiddleware)());
app.use(express_1.default.json());
const PORT = env_1.ENV.PORT;
// const __dirname = path.resolve();
// console.log('resolving it', path.resolve());
app.use('/api/inngest', (0, express_3.serve)({ client: inngest_1.inngest, functions: inngest_1.functions }));
app.get('/api/health', (req, res) => {
    res.send('<h1>Testing the API</h1>');
});
if (env_1.ENV.NODE_ENV === 'production') {
    app.use(express_1.default.static(node_path_1.default.join(__dirname, '../../admin/dist')));
    app.get('/{*any}', (req, res) => {
        res.sendFile(node_path_1.default.join(__dirname, '../../admin', 'dist', 'index.html'));
    });
}
const startApp = () => {
    (0, db_mongoose_1.connectDatabase)(env_1.ENV.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`app is listening on http://localhost:${PORT}`);
    });
};
startApp();
console.log('the entry point');
