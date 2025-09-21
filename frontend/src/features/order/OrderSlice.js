import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allOrderApi, createCheckoutSessionApi } from "./orderApi";
import toast from "react-hot-toast";

export const allOrders = createAsyncThunk(
  "order/allOrders",
  async (_, thunkAPI) => {
    try {
      const data = await allOrderApi();
      return data.orders;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createCheckoutSession = createAsyncThunk(
  "order/createCheckoutSession",
  async ({ orderDetails, addressOption, savedAddress, newAddress }, thunkAPI) => {
    try {
      const data = await createCheckoutSessionApi(
        orderDetails,
        addressOption,
        savedAddress,
        newAddress
      );
      window.location.href = data.url;
      return data;
    } catch (err) {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    status: "idle",
    checkoutStatus: "idle",
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      if (state.status === "failed") state.status = "idle";
      if (state.checkoutStatus === "failed") state.checkoutStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(allOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(allOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCheckoutSession.pending, (state) => {
        state.checkoutStatus = "loading";
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state) => {
        state.checkoutStatus = "succeeded";
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.checkoutStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
