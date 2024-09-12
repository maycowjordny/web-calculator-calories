import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-calculator-calories-1.onrender.com",
});

export default axiosInstance;
