import { axiosInstance } from "../../libs/axios";

export const getAllProduct = async () => {
  try {
    const res = await axiosInstance.get("product/all/product");
    return res.data.products; 
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch product";
    throw new Error(message);
  }
};

export const viewProductApi = async (id) => {
  try {
    const res = await axiosInstance.get("product/view-product/"+id);
    return res.data.product; 
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch product";
    throw new Error(message);
  }
};
