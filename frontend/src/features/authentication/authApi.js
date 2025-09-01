import { axiosInstance } from "../../libs/axios";

export const check= async () => {
  try {
    const res = await axiosInstance.get("auth/me");
    return res.data; 
  } catch (err) {
    console.log(err);
  }
}

export const signup = async (formData) => {
  try {
    const res = await axiosInstance.post("auth/signup", formData);
    console.log(res.data.user);
    
    return res.data.user; 
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Signup failed";
    throw new Error(message);
  }
};

export const verifyOtp = async (formData) => {
  try {
    const res = await axiosInstance.post("auth/verify-otp", formData);
    
    return res.data.user; 
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Signup failed";
    throw new Error(message);
  }
};

export const signin = async (formData) => {
  try {
    const res = await axiosInstance.post("/auth/login", formData);
    return res.data.user; 
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Signin failed";
    throw new Error(message);
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/logout");    
    return res.data; 
  } catch (err) {
    const message =
      err.response?.data?.message || err.message || "Logout failed";
    throw new Error(message);
  }
};