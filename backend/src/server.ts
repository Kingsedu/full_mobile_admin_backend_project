import express, { Request, Response } from 'express';
import path from 'node:path';
import cors from 'cors';
import { ENV } from './config/env';
import { connectDatabase } from './db/db.mongoose';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import { functions, inngest } from './lib/inngest';
const app = express();

app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());
app.use('/api/inngest', serve({ client: inngest, functions }));

const PORT = ENV.PORT;
// const __dirname = path.resolve();
// console.log('resolving it', path.resolve());
app.get('/api/health', (req, res) => {
  res.send('<h1>Testing the API</h1>');
});
app.post('/api/test', (req, res) => {
  res.json({ ok: true });
});

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../admin/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin', 'dist', 'index.html'));
  });
}

const startApp = () => {
  connectDatabase(ENV.MONGO_URL as string);
  app.listen(PORT, () => {
    console.log(`app is listening on http://localhost:${PORT}`);
  });
};
startApp();
console.log('the entry point');
