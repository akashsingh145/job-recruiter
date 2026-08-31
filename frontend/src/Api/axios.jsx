// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://192.168.1.15:5000/api", // Replace with your laptop's actual IPv4 address
// });

// // Send token
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default API;
import axios from "axios";

// window.location.hostname automatically grabs whatever IP or domain 
// is currently in the browser's address bar.
const API = axios.create({
 baseURL: "https://wgl1jx1d-5000.inc1.devtunnels.ms/api", 
});

// Send token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;