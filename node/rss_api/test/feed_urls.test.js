const axios = require('axios');

test('GET request to /feed/urls succeeded', () => {
  return axios.get('http://localhost:3000/feed/urls').then(response => {
    expect(response.data.done).toBeTruthy();
  });
});
