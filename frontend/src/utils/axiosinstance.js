import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },

    withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error("Axios Error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response && error.response.status === 401) {
            // Redirect to login page if NOT already on login or signup
            const isAuthPage = window.location.pathname === "/login" || window.location.pathname === "/signup";
            if (!isAuthPage) {
                window.location.href = "/login";
            }
        }else if(error.response && error.response.status === 500) {
            // Redirect to 500 page
          console.error("Server Error:", error);
        }else if(error.code === "ECONNABORTED") {
            console.error("Request timed out:", error);
        }
        return Promise.reject(error);
    }

);



export default axiosInstance;
