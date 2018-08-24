const axios = require('axios');

const rss_url = 'https://www.sports.ru/stat/export/rss/taglenta.xml?id=1044511';

test('Request to /saveFeed succeeded', () => {
  return axios
    .get('http://localhost:3000/saveFeed', {
      params: {
        rss_url
      }
    })
    .then(response => {
      expect(response.data.done).toBeTruthy();
    });
});
