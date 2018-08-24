const mongoose = require('mongoose');
const express = require('express');
const { MONGO_URL } = require('./config');
const insertRSS = require('./insert');
const Feed = require('./feed');

const app = express();

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Соединение с базой данных установлено');

  app.get('/saveFeed', function(req, res) {
    res.type('json');
    const { rss_url } = req.query;

    insertRSS(rss_url)
      .then(count => {
        res.send(JSON.stringify({ result: { newsAdded: count }, done: true }, null, 4));
      })
      .catch(err => {
        res.send(JSON.stringify({ error: err.message, done: false }, null, 4));
      });
  });

  app.get('/feedUrls', function(req, res) {
    res.type('json');
    Feed.find()
      .distinct('rssUrl')
      .then(arr => res.send(JSON.stringify({ result: arr, done: true }, null, 4)))
      .catch(err => {
        res.send(JSON.stringify({ error: err.message, done: false }, null, 4));
      });
  });

  app.get('/allFeeds', function(req, res) {
    res.type('json');
    Feed.find()
      .then(arr => res.send(JSON.stringify({ result: arr, done: true }, null, 4)))
      .catch(err => {
        res.send(JSON.stringify({ error: err.message, done: false }, null, 4));
      });
  });

  app.listen(3000, () => {
    console.log('Соединение с сервером установлено');
  });
});
