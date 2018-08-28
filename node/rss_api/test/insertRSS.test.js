const mongoose = require('mongoose');
const Feed = require('../feed');
const { MONGO_URL } = require('../config');

const fakeData = [
    {
      rssUrl: 'http://fake.com/index.xml',
      title: 'Fake news 1',
      content: 'Fake news 1',
      contentSnippet: 'Fake news 1',
      guid: 'http://fake.com/fakenews1.html',
      pubDate: new Date(0).toString(),
      isoDate: new Date(0)
    },
    {
      rssUrl: 'http://fake.com/index.xml',
      title: 'Fake news 2',
      content: 'Fake news 2',
      contentSnippet: 'Fake news 2',
      guid: 'http://fake.com/fakenews2.html',
      pubDate: new Date('2018 08 27').toString().toString(),
      isoDate: new Date('2018 08 27').toString()
    }
  ],
  expectedResult = 2;

beforeAll(() => {
  return mongoose.connect(
    MONGO_URL,
    { useNewUrlParser: true }
  );
});

afterAll(() => {
  return Feed.deleteMany({ rssUrl: 'http://fake.com/index.xml' }).then(() => {
    mongoose.disconnect();
  });
});

test('Method inserts news to db', () => {
  return Feed.insertRSS(Promise.resolve(fakeData)).then(count => {
    expect(count).toBe(expectedResult);
  });
});
