import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api/v1" : "https://e-commerce-1-txaf.onrender.com/api/v1",
  withCredentials: true,
});