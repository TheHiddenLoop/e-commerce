import { axiosInstance } from "../../../libs/axios";

export const check = async () => {
  try {
    const res = await axiosInstance.get("admin/me");
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Signup failed";
    throw new Error(message);
  }
};

export const verifyOtp = async (formData) => {
  try {
    const res = await axiosInstance.post("admin/verify-otp", formData);

    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Signup failed";
    throw new Error(message);
  }
};

export const signin = async (formData) => {
  try {
    const res = await axiosInstance.post("/admin/login", formData);
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Signin failed";
    throw new Error(message);
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/admin/logout");
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Logout failed";
    throw new Error(message);
  }
};
