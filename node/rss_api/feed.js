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

module.exports = mongoose.model('Feed', FeedSchema);
