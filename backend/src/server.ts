import express, { Request, Response } from 'express';
import path from 'node:path';
import cors from 'cors';
import { ENV } from './config/env';
// import { fileURLToPath } from 'url';
const app = express();

app.use(cors());
const PORT = ENV.PORT;
// const __dirname = path.resolve();
// console.log('resolving it', path.resolve());
app.get('/api/health', (req, res) => {
  res.send('<h1>Testing the API</h1>');
});

if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../admin/dist')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../../admin', 'dist', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});

console.log('the entry point');
