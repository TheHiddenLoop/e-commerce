import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api/v1" : "https://e-commerce-oycg.vercel.app/api/v1",
  withCredentials: true,
});