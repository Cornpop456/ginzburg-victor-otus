const Parser = require('rss-parser');
const parser = new Parser();

/**
 * Function returning promise which resolves to array of news from rss feed.
 * @param {string} RSS_URL - url of rss feed
 */
module.exports = async RSS_URL => {
  try {
    const feed = await parser.parseURL(RSS_URL);

    const data = feed.items.map(item => {
      const { isoDate } = item;
      item.isoDate = new Date(isoDate);
      item.rssUrl = RSS_URL;
      return item;
    });

    return data;
  } catch (err) {
    throw new Error('Произошла ошибка при парсинге RSS');
  }
};
