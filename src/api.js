// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://192.168.29.55:5000", // Update this if the backend is hosted elsewhere
  timeout: 5000,
});

export default api;
