const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: String,
  content: String,
  contentSnippet: String,
  guid: { type: String, unique: true },
  pubDate: String,
  isoDate: Date
});

module.exports = mongoose.model('News', NewsSchema);
