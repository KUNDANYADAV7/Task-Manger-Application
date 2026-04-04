import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send cookies
});

let isRefreshing = false;
let failedQueue = []; 

// process all pending requests
const processQueue = (error = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // handle only 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {

      //  prevent retry for refresh endpoint itself
      if (originalRequest.url.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      // queue requests if refresh already running
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(API(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // call refresh token API
        await API.post("/auth/refresh");

        // retry all failed requests
        processQueue();

        return API(originalRequest);
      } catch (err) {
        // refresh failed → clear queue
        processQueue(err);

        // let React handle redirect (DON'T use window.location)
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;