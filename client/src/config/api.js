import axios from "axios";

const api = axios.create({
  baseURL:"https://quick-stay-kysi.onrender.com/api" || "http://localhost:5000/api",
});

export default api;
