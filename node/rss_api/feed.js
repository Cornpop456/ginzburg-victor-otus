const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedSchema = new Schema({
  rssUrl: String,
  title: String,
  content: String,
  contentSnippet: String,
  guid: { type: String, unique: true },
  pubDate: String,
  isoDate: Date
});

FeedSchema.statics.insertRSS = async function(dataPromise) {
  try {
    const data = await dataPromise;
    let newsCount = 0;

    for (let item of data) {
      const res = await this.updateOne({ guid: item.guid }, item, {
        upsert: true
      });

      if (res.upserted) {
        newsCount += 1;
      }
    }

    return newsCount;
  } catch (err) {
    console.log(err);
    throw new Error('Ошибка при добавлении в базу данных');
  }
};

module.exports = mongoose.model('Feed', FeedSchema);
