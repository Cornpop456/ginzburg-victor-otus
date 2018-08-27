const axios = require('axios');

test('GET request to /feed/all succeeded', () => {
  return axios.get('http://localhost:3000/feed/all').then(response => {
    expect(response.data.done).toBeTruthy();
  });
});
