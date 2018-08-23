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
    .then(async data => {
      let counter = 0;
      for (let item of data) {
        const res = await News.updateOne({ guid: item.guid }, item, {
          upsert: true
        });

        if (res.upserted) {
          console.log('--News was added to db--\n');
          counter += 1;
        }
      }

      return counter;
    })
    .then(counter => console.log(counter + ' news were added to db\n'))
    .catch(console.log)
    .finally(() => {
      db.close();
      console.log('Connection closed');
    });
});
