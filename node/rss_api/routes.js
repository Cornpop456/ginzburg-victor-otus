const Feed = require('./feed');
const grab = require('./grab');

const saveFeed = function(req, res) {
  const { rss_url } = req.body;

  if (typeof rss_url === 'undefined') {
    return res.json({ error: 'Не передан url', done: false });
  }

  Feed.insertRSS(grab(rss_url))
    .then(count => {
      res.json({ result: { newsAdded: count }, done: true });
    })
    .catch(err => {
      res.json({ error: err.message, done: false });
    });
};

const getFeedUrls = function(req, res) {
  Feed.find()
    .distinct('rssUrl')
    .then(arr => res.json({ result: arr, done: true }))
    .catch(err => {
      res.json({ error: err.message, done: false });
    });
};

const getAllData = function(req, res) {
  Feed.find()
    .then(arr => res.send(JSON.stringify({ result: arr, done: true }, null, 4)))
    .catch(err => {
      res.json({ error: err.message, done: false });
    });
};

module.exports = { saveFeed, getFeedUrls, getAllData };
