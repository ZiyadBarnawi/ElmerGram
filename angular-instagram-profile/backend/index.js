import { log } from 'console';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(morgan('tiny'));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Header', 'Content-Type');
//   next();
// });
app.use(cors({ origin: '*' }));
app.get('/user', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/user.json', { encoding: 'utf-8' }));
  res.json({ ...data });
});
app.get('/reels', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/reels.json', { encoding: 'utf-8' }));
  const date = new Date();
  data.forEach((reel) => (reel.createdAt = (date.getDate() + Math.random() * 10).toString()));
  return res.json({ data });
});
app.listen('3000', '127.0.0.1', () => {
  console.log('Listening on port 3000 📞...');
});
