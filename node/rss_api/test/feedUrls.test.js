const axios = require('axios');

test('Request to /feedUrls succeeded', () => {
  axios.get('http://localhost:3000/feedUrls').then(response => {
    expect(response.data.done).toBeTruthy();
  });
});
