import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCartApi, allCartApi, removeCartApi } from "./cartApi";


export const addCart = createAsyncThunk(
  "cart/addCart",
  async (formData, thunkAPI) => {
    try {
      const data = await addCartApi(formData);
      return data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const allCart = createAsyncThunk(
  "cart/allCart",
  async (_, thunkAPI) => {
    try {
      const data = await allCartApi();
      return data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const removeCart = createAsyncThunk(
  "cart/removeCart",
  async ({ cartId, productId }, thunkAPI) => {
    try {
      const data = await removeCartApi(cartId, productId);      
      return data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],     
    count: 0,       
    total: 0,      
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
      // add cart
      .addCase(addCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = action.payload.items || action.payload;
        state.count = action.payload.items.length || 0;
        state.total = action.payload.totalPrice || 0;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(allCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(allCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = action.payload || action.payload;
        state.count = action.payload.items.length || 0;
        state.total = action.payload.totalPrice || 0;
      })
      .addCase(allCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(removeCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = action.payload;
        state.count = action.payload.items.length || 0;
        state.total = action.payload.totalPrice || 0;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
