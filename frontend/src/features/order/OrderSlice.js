import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allOrderApi } from "./orderApi";
import toast  from "react-hot-toast";


export const allOrders = createAsyncThunk(
  "order/allOrder",
  async (_, thunkAPI) => {
    try {
      const data = await allOrderApi();  
      return data.orders;                  
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],      
    status: "idle", 
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      if (state.status === "failed") state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // all orders
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
      
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
