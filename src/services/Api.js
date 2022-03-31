/* Uusi axios-instanssi */
const axios = require("axios");
const instance = axios.create({
  baseURL: 'https://container-service-1.1bm12m42tdcru.eu-north-1.cs.amazonlightsail.com',
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
  validateStatus: () => true,
});

/* Metodit */

/* Posts login payload to /api/login */

const postData = (path, data) => {
  return new Promise((resolve, reject) => {
    instance
      .post(path, data)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (error) {
        return resolve(error);
      });
  });
};

module.exports = { postData };
