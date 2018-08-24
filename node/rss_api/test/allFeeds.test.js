const axios = require('axios');

test('Request to /allFeeds succeeded', () => {
  axios
    .get('http://localhost:3000/allFeeds')
    .then(response => {
      expect(response.data.done).toBeTruthy();
    })
    .catch(error => {
      console.log(error);
    });
});
