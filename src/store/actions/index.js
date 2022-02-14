import { ADD_USER } from "../constants/index";

export function addUser(payload) {
  return { type: ADD_USER, payload };
}

export function getData() {
  return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      return { type: "DATA_LOADED", payload: json };
    });
}
