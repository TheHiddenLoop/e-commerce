import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCartApi, allCartApi, removeCartApi } from "./cartApi";
import toast from "react-hot-toast";

const extractCartData = (payload) => {
  const items = payload?.items || [];
  return {
    carts: items,
    count: items.length,
    total: payload?.totalPrice || 0,
  };
};

// ✅ ADD CART
export const addCart = createAsyncThunk("cart/addCart", async (formData, thunkAPI) => {
  try {
    const data = await addCartApi(formData);
    toast.success(data.message);
    return data.cart || {};
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

// ✅ GET ALL CART
export const allCart = createAsyncThunk("cart/allCart", async (_, thunkAPI) => {
  try {
    const data = await allCartApi();
    return data.cart || {};
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// ✅ REMOVE CART
export const removeCart = createAsyncThunk("cart/removeCart", async ({ cartId, productId }, thunkAPI) => {
  try {
    const data = await removeCartApi(cartId, productId);
    toast.success(data.message);
    return data.cart || {};
  } catch (err) {
    const message = err.response?.data?.message || err.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

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
      // ADD
      .addCase(addCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { carts, count, total } = extractCartData(action.payload);
        state.carts = carts;
        state.count = count;
        state.total = total;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // GET ALL
      .addCase(allCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(allCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { carts, count, total } = extractCartData(action.payload);
        state.carts = carts;
        state.count = count;
        state.total = total;
      })
      .addCase(allCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // REMOVE
      .addCase(removeCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { carts, count, total } = extractCartData(action.payload);
        state.carts = carts;
        state.count = count;
        state.total = total;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
