const News = require('./news');

/**
 * Function returning promise which resolves to count of inserted documents to db.
 * @param {Promise} accum - Promise resolving to number which accomulate count of new documents
 * @param {Object} item - news to insert
 */
module.exports = async (accum, item) => {
  try {
    let accumValue = await accum;

    const res = await News.updateOne({ guid: item.guid }, item, {
      upsert: true
    });

    if (res.upserted) accumValue += 1;

    return accumValue;
  } catch (err) {
    throw new Error('Error when document adding occurred');
  }
};
