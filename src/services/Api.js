const axios = require("axios");

const URL = 'https://container-service-1.1bm12m42tdcru.eu-north-1.cs.amazonlightsail.com/';

/* New axios instance */
const instance = axios.create({
  baseURL: URL,
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
  validateStatus: () => true,
});

/* Posts login payload to /login */
const postData = (path, data) => {
  return new Promise((resolve, reject) => {
    instance
      .post(path, data)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

module.exports = { postData };
