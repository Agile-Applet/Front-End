/* Uusi axios-instanssi */
const axios = require("axios");
const instance = axios.create({
  baseURL: "https://httpbin.org/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

/* Metodit */

/* Posts login payload to /api/login */

const login = (data) => {
  return new Promise((resolve, reject) => {
    instance
      .post("/post", data)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        return resolve(error);
      });
  });
};

/* Posts register payload to /api/register */

const registerUser = (data) => {
  return new Promise((resolve, reject) => {
    instance
      .post("/login", data)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        return resolve(error);
      });
  });
};

/* Deposit payload */

const depositMoney = (data) => {
  return new Promise((resolve, reject) => {
    instance
      .post("/deposit", data)
      .then(function (response) {
        return resolve(response.data);
      })
      .catch(function (error) {
        return resolve(error);
      });
  });
};

module.exports = { login, registerUser, depositMoney };
