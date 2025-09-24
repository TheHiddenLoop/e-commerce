import { signup, signin, check, logout, verifyOtp } from "./authApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast"

export const signupAuth = createAsyncThunk(
  "auth/signup",
  async (formData, thunkAPI) => {
    try {
      const data = await signup(formData);
      toast.success(data.message);
      return data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);


export const verifyOtpAuth = createAsyncThunk(
  "auth/verify-otp",
  async (formData, thunkAPI) => {
    try {
      const data = await verifyOtp(formData);
      toast.success(data.message);

      return data;
    } catch (err) {
      toast.error(err.message);

      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const signinAuth = createAsyncThunk(
  "auth/signin",
  async (formData, thunkAPI) => {
    try {
      const data = await signin(formData);
      toast.success(data.message);
      return data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const checkAuth = createAsyncThunk("auth/check", async (_, thunkAPI) => {
  try {
    const data = await check();
    if (!data || !data.isVerified) {
      return thunkAPI.rejectWithValue("User not verified");
    }

    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const logoutAuth = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const data = await logout();
    toast.success(data.message);
      return data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", 
    error: null,
    statusCheck: "loading", 
    authUser: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      if (state.status === "failed") state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signupAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Verify Otp
      .addCase(verifyOtpAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtpAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(verifyOtpAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Signin
      .addCase(signinAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signinAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signinAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // CheckAuth
      .addCase(checkAuth.pending, (state) => {
        state.statusCheck = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.statusCheck = "succeeded";
        state.user = action.payload;
        state.authUser=action.payload.isVerified;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.statusCheck = "failed";
        state.user = null;
        state.authUser = false;
      })
      // Logout
      .addCase(logoutAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAuth.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.authUser = false;
      })
      .addCase(logoutAuth.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
