const Parser = require('rss-parser');
const parser = new Parser();

/**
 * Function returning promise which resolves to array of news from rss feed.
 * @param {string} RSS_URL - url of rss feed
 */
module.exports = async RSS_URL => {
  try {
    const feed = await parser.parseURL(RSS_URL);

    const data = [];

    feed.items.forEach(item => {
      const { isoDate } = item;
      item.isoDate = new Date(isoDate);
      data.push(item);
    });

    return data;
  } catch (err) {
    return err;
  }
};
