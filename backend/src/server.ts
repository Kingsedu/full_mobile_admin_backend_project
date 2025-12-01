import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();

app.use(cors());
const PORT = 3000;
app.get('/', (req, res) => {
  res.send('<h1>Testing the API</h1>');
});
app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});

console.log('the entry point');
