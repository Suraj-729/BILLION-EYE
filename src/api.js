// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5000", // Update this if the backend is hosted elsewhere
  timeout: 5000,
});

export default api;
