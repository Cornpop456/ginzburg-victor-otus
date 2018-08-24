const axios = require('axios');

test('Request to /allFeeds succeeded', () => {
  return axios.get('http://localhost:3000/allFeeds').then(response => {
    expect(response.data.done).toBeTruthy();
  });
});
