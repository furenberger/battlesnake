require('dotenv').config();
const express = require('express');
const {
  start, move, end,
} = require('./logic');

const { info } = require('./util');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.set('Server', 'snakenberger');
  next();
});

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send(info());
});

app.post('/start', (req, res) => {
  res.send(start(req.body));
});

app.post('/move', (req, res) => {
  res.send(move(req.body));
});

app.post('/end', (req, res) => {
  res.send(end(req.body));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Starting Battlesnake Server at http://0.0.0.0:${port}...`);
});
