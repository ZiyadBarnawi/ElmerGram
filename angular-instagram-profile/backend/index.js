import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import cors from 'cors';

let data = JSON.parse(fs.readFileSync('./data/users.json', { encoding: 'utf-8' }));
const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use(cors({ origin: '*' }));
app.get('/users', (req, res) => {
  res.json(data);
});
//? User CRU

app.get('/users/:username', (req, res) => {
  let user = data.filter((user) =>
    user.username.toLowerCase().includes(req.params.username.toLowerCase()),
  );
  res.json(user);
});

app.post('/users', async (req, res) => {
  let newUser = { ...req.body };

  try {
    data.push(newUser);
    await fs.writeFile('./data/users.json', JSON.stringify(data), (err) => {
      if (err) console.log(err);
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ newUser });
});
app.put('/users/:username', async (req, res) => {
  let userIndex = data.findIndex(
    (user) => user.username.toLowerCase() === req.params.username.toLowerCase(),
  );
  if (userIndex < 0) {
    res
      .status(404)
      .json({ message: `No User was found with this username  " ${req.params.username} " ` });
  }
  data[userIndex] = req.body;

  await fs.writeFile('./data/users.json', JSON.stringify(data), (err) => {
    if (err) console.log(err);
  });
  res.json(data[userIndex]);
});

//? reels
app.get('/reels', async (req, res) => {
  const data = JSON.parse(await fs.readFile('./data/reels.json', { encoding: 'utf-8' }));
  const date = new Date();
  data.forEach((reel) => (reel.createdAt = (date.getDate() + Math.random() * 10).toString()));
  return res.send(data);
});
app.listen('3000', '127.0.0.1', () => {
  console.log('Listening on port 3000 📞...');
});
