import axios from "axios";

const API = axios.create({
  baseURL: "https://pos-sys-bn8s.onrender.com/api",
  withCredentials: true,
});

export default API;
