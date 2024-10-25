import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-fit-caloria.onrender.com",
});

export default axiosInstance;
