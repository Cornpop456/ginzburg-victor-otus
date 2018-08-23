const mongoose = require('mongoose');
const News = require('./news');
const grab = require('./grab');
const { RSS_URL, MONGO_URL } = require('./config');

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
      let counter = data.length;
      let news = 0;
      for (let item of data) {
        News.updateOne({ guid: item.guid }, item, {
          upsert: true
        })
          .then(raw => {
            counter -= 1;

            if (raw.upserted) {
              console.log('--News was added to db--\n');
              news += 1;
            }

            if (counter === 0) {
              console.log(news + ' news were added to db\n');
              db.close();
              console.log('Connection closed');
            }
          })
          .catch(err => {
            console.log(err + '\n');
            db.close();
            console.log('Connection closed');
            process.exit(1);
          });
      }
    })
    .catch(err => {
      console.log(err + '\n');
      db.close();
      console.log('Connection closed');
    });
});
