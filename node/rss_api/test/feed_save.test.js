const axios = require('axios');

const rss_url = 'https://www.sports.ru/stat/export/rss/taglenta.xml?id=1044511';

test('POST request to /feed/save succeeded', () => {
  return axios
    .post('http://localhost:3000/feed/save', {
      rss_url
    })
    .then(response => {
      expect(response.data.done).toBeTruthy();
    });
});
