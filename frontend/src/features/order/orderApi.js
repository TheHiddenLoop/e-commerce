import { axiosInstance } from "../../libs/axios";

export const allOrderApi = async () => {
  try {
    const res = await axiosInstance.get("order/all-orders");
    return res.data;  
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch products";
    throw new Error(message);
  }
};