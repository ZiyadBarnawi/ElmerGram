import { log } from 'console';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(morgan('tiny'));

app.use(cors({ origin: '*' }));
app.get('/users', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/users.json', { encoding: 'utf-8' }));
  res.json(data);
});

app.get('/users/:username', (req, res) => {
  let data = JSON.parse(fs.readFileSync('./data/users.json', { encoding: 'utf-8' }));
  if (!data) return;

  data = data.filter((user) =>
    user.username.toLowerCase().includes(req.params.username.toLowerCase()),
  );
  res.json(data);
});
app.get('/reels', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/reels.json', { encoding: 'utf-8' }));
  const date = new Date();
  data.forEach((reel) => (reel.createdAt = (date.getDate() + Math.random() * 10).toString()));
  return res.send(data);
});
app.listen('3000', '127.0.0.1', () => {
  console.log('Listening on port 3000 📞...');
});
