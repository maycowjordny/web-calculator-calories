import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444",
});

export default axiosInstance;
