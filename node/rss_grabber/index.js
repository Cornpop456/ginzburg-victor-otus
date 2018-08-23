const mongoose = require('mongoose');
const grab = require('./grab');
const { RSS_URL, MONGO_URL } = require('./config');
const News = require('./news');

mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection opended\n');
  grab(RSS_URL)
    .then(data => {
      return News.insertMany(data.map(item => new News(item)), { ordered: false });
    })
    .then(res => {
      console.log(res.length + ' news were saved to db\n');
    })
    .catch(err => {
      if (err.result && err.result.result && typeof err.result.result.nInserted === 'number') {
        console.log(err.result.result.nInserted + ' news were saved to db\n');
      } else {
        console.log(err);
      }
    })
    .finally(() => {
      db.close();
      console.log('Connection closed');
    });
});
