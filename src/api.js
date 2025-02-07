// src/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "/backend", // Update this if the backend is hosted elsewhere
//   timeout: 5000,
// });

//  export default api;
// src/api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "/backend", // Update this if the backend is hosted elsewhere
  baseURL: "http://localhost:5000", // Update this if the backend is hosted elsewhere
  timeout: 5000,
});
api.interceptors.response.use(
  response => response, // If the request succeeds, just return the response
  error => {
    // If the request fails (e.g., due to server being unreachable)
    if (error.response === undefined) {
      // Modify the base URL to fallback to localhost
      error.config.baseURL = "http://localhost:5000";
      // Retry the request with the new base URL
      return axios(error.config);
    }
    // If the error is not related to unreachable server, reject it
    return Promise.reject(error);
  }
);

export default api;