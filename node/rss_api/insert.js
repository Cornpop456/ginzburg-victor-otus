const Feed = require('./feed');
const grab = require('./grab');

async function insertRSS(url) {
  try {
    let newsCount = 0;

    const data = await grab(url);

    for (let item of data) {
      const res = await Feed.updateOne({ guid: item.guid }, item, {
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
}

module.exports = insertRSS;
