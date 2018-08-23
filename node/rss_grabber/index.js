const mongoose = require('mongoose');
const grab = require('./grab');
const reducer = require('./reducer');
const { RSS_URL, MONGO_URL } = require('./config');
// const News = require('./news');

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection opended\n');
  grab(RSS_URL)
    .then(data => data.reduce(reducer, Promise.resolve(0)))
    .then(count => console.log(count + ' news were added to db\n'))
    .catch(console.log)
    .finally(() => {
      db.close();
      console.log('Connection closed');
    });
});
