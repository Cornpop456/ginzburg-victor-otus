const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { MONGO_URL } = require('./config');
const { FEED } = require('./endpoints');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Соединение с базой данных установлено');

  app.post(FEED.SAVE, routes.saveFeed);

  app.get(FEED.URLS, routes.getFeedUrls);

  app.get(FEED.ALL, routes.getAllData);

  app.listen(3000, () => {
    console.log('Соединение с сервером установлено');
  });
});
