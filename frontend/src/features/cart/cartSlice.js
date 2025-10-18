import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCartApi, allCartApi, removeCartApi } from "./cartApi";
import toast from "react-hot-toast";

// ✅ Utility to safely extract cart state
const normalizeCart = (payload) => {
  if (!payload) return { items: [], totalPrice: 0 };
  return {
    items: payload.items || [],
    totalPrice: payload.totalPrice || 0,
  };
};

export const addCart = createAsyncThunk(
  "cart/addCart",
  async (formData, thunkAPI) => {
    try {
      const data = await addCartApi(formData);
      toast.success(data?.message || "Item added to cart");
      return data?.cart;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Error adding cart";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allCart = createAsyncThunk(
  "cart/allCart",
  async (_, thunkAPI) => {
    try {
      const data = await allCartApi();
      return data?.cart;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Error fetching cart";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeCart = createAsyncThunk(
  "cart/removeCart",
  async ({ cartId, productId }, thunkAPI) => {
    try {
      const data = await removeCartApi(cartId, productId);
      toast.success(data?.message || "Item removed from cart");
      return data?.cart;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Error removing cart item";
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],       // items
    count: 0,        // number of items
    total: 0,        // total price
    status: "idle",  // idle | loading | succeeded | failed
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
        const cart = normalizeCart(action.payload);
        state.carts = cart.items;
        state.count = cart.items.length;
        state.total = cart.totalPrice;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // all cart
      .addCase(allCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(allCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const cart = normalizeCart(action.payload);
        state.carts = cart.items;
        state.count = cart.items.length;
        state.total = cart.totalPrice;
      })
      .addCase(allCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // remove cart
      .addCase(removeCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const cart = normalizeCart(action.payload);
        state.carts = cart.items;
        state.count = cart.items.length;
        state.total = cart.totalPrice;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
