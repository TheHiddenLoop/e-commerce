import { axiosInstance } from "../../libs/axios";

export const getAllProduct = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);

    const res = await axiosInstance.get(`/product/all/product?${params.toString()}`);
    return res.data.products; 
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch products";
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


export const reviewApi = async (id, formData) => {
  try {
    const res = await axiosInstance.post(`product/review/${id}`, formData);
    return res.data; 
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch product";
    throw new Error(message);
  }
};


