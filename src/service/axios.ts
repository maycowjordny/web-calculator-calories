import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444",
  /*  baseURL: "https://api-fit-caloria.onrender.com", */
});

export default axiosInstance;
