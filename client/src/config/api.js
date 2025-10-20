import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
const { getToken } = useAuth();
const token = await getToken();
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
