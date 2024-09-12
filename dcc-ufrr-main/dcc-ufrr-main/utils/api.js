import Axios from "axios";

let urls = {
  development: process.env.NEXT_PUBLIC_API_URL_LOCAL,
  production: process.env.NEXT_PUBLIC_API_URL_DEPLOY,
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
