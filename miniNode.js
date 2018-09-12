const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ welcome: req.ip });
});

app.get('/api/user', (req, res) => {
  res.json({ name: 'Richard' });
});

app.get('/api/books', (req, res) => {
  res.json({ books: 545 });
});

function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

app.get('/', (req, res) => {
  Promise.all([
    get(`http://localhost:${PORT}/api/user`),
    get(`http://localhost:${PORT}/api/books`)
  ]).then(([user, {books}]) =>
    res.send({
      user: user.name,
      books
    }))
    .catch(err => res.send('Ops, something has gone wrong'))
})

app.use(express.static(__dirname + '/'))
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))