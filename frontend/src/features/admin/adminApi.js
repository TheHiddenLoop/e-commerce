import { axiosInstance } from "../../libs/axios";

export const addProductApi = async (formData) => {
  try {
    const res = await axiosInstance.post("product/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch product";
    throw new Error(message);
  }
};

export const AllSellingProduct = async () => {
  try {
    const res = await axiosInstance.get("product/all/selling/products");
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch product";
    throw new Error(message);
  }
};

export const removeProductApi = async (id) => {
  try {
    const res = await axiosInstance.delete("product/remove/" + id);
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch product";
    throw new Error(message);
  }
};

export const orderedItemsApi = async () => {
  try {
    const res = await axiosInstance.get("/order/ordred/items");
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch product";
    throw new Error(message);
  }
};

export const updateStatusApi = async (id, status) => {
  try {
    const res = await axiosInstance.patch(`/order/update/${id}/status`, {
      deliveryStatus: status,   
    });
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to update status";
    throw new Error(message);
  }
};


export const analyticalApi = async () => {
  try {
    const res = await axiosInstance.get("/order/analytical/data");
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch product";
    throw new Error(message);
  }
};
