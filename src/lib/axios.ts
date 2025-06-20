import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.currencybeacon.com/v1/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_CURRENCY_API_KEY}`,
  },
});

export default axiosInstance;
