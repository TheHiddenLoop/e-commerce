import { axiosInstance } from "../../libs/axios";

export const addCartApi = async (formdata) => {
  try {
    const res = await axiosInstance.post("cart/add", formdata);
    return res.data;  
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to add product";
    throw new Error(message);
  }
};

export const allCartApi = async () => {
  try {
    const res = await axiosInstance.get("cart/all");
    return res.data;  
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch products";
    throw new Error(message);
  }
};

export const removeCartApi = async (cartId, productId) => {
  try {
    const res = await axiosInstance.delete(`/cart/remove/${cartId}`, {
      data: { productId },
    });
    return res.data;  
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to remove product";
    throw new Error(message);
  }
};
