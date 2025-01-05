import axios from "axios";

const api = axios.create({
    baseURL: "http://interviews.test/api", // Replace with your Laravel API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
