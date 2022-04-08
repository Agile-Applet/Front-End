const axios = require("axios");

const URL = process.env.API_BASE_STRING || 'http://localhost:3001';

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
