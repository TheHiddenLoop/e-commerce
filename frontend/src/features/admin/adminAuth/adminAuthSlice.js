import { signin, check, logout, verifyOtp } from "./adminAuthApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const verifyOtpAuth = createAsyncThunk(
  "admin/auth/verify-otp",
  async (formData, thunkAPI) => {
    try {
      const data = await verifyOtp(formData);
      toast.success(data.message);
      return data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const signinAuth = createAsyncThunk(
  "admin/auth/signin",
  async (formData, thunkAPI) => {
    try {
      const data = await signin(formData);
      toast.success(data.message);
      return data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const checkAdminAuth = createAsyncThunk("admin/auth/check", async (_, thunkAPI) => {
  try {
    const data = await check();
    if (!data || !data.isVerified) {
      return thunkAPI.rejectWithValue("Admin not verified");
    }
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const logoutAuth = createAsyncThunk("admin/logout", async (_, thunkAPI) => {
  try {
    const data = await logout();
    toast.success(data.message);
    return data;
  } catch (err) {
    toast.error(data.message);
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const adminAuthSlice = createSlice({
  name: "authAdmin",
  initialState: {
    admin: null,
    status: "idle", 
    error: null,
    statusCheck: "loading",
    authAdmin: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      if (state.status === "failed") state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Verify OTP
      .addCase(verifyOtpAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtpAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload;
        state.authAdmin = true;
      })
      .addCase(verifyOtpAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.authAdmin = false;
      })
      // Signin
      .addCase(signinAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signinAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload;
        state.authAdmin = false; 
      })
      .addCase(signinAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.admin = null;
      })
      // Check Auth
      .addCase(checkAdminAuth.pending, (state) => {
        state.statusCheck = "loading";
      })
      .addCase(checkAdminAuth.fulfilled, (state, action) => {
        state.statusCheck = "succeeded";
        state.admin = action.payload;
        state.authAdmin = action.payload.isVerified;
      })
      .addCase(checkAdminAuth.rejected, (state) => {
        state.statusCheck = "failed";
        state.admin = null;
        state.authAdmin = false;
      })
      // Logout
      .addCase(logoutAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAuth.fulfilled, (state) => {
        state.status = "succeeded";
        state.admin = null;
        state.authAdmin = false;
      })
      .addCase(logoutAuth.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
