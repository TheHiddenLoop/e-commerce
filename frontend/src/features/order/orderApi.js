import { axiosInstance } from "../../libs/axios";

export const allOrderApi = async () => {
  try {
    const res = await axiosInstance.get("/order/all-orders");
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Failed to fetch orders";
    throw new Error(message);
  }
};

export const createCheckoutSessionApi = async (orderDetails, addressOption, savedAddress, newAddress) => {
  try {
    const { data } = await axiosInstance.post("/order/create-checkout-session", {
      orderItems: orderDetails.products,
      addressOption,
      shippingAddress: addressOption === "saved" ? savedAddress : newAddress,
    });
    return data;
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || "Checkout failed";
    throw new Error(message);
  }
};