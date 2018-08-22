const mongoose = require('mongoose');
const grab = require('./grab');
const { RSS_URL } = require('./config');
const News = require('./news');

mongoose.connect(
  'mongodb://localhost/spartakNews',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection opended\n');
  News.deleteMany({})
    .then(() => {
      console.log('Collection cleaned\n');
      return grab(RSS_URL);
    })
    .then(data => {
      return Promise.all(data.map(item => new News(item).save()));
    })
    .then(res => {
      console.log(res.length + ' news were saved to db\n');
    })
    .catch(err => console.log(err))
    .finally(() => {
      db.close();
      console.log('Connection closed');
    });
});
