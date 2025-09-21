import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProductApi, AllSellingProduct, orderedItemsApi, removeProductApi, updateStatusApi } from "./adminApi";
import toast from "react-hot-toast";

export const addProduct = createAsyncThunk(
  "product/add",
  async (formData, thunkAPI) => {
    try {
      const data = await addProductApi(formData);
      console.log(data);
      toast.success(data.message);
      return data.product;
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to add product"
      );
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const allSellingProducts = createAsyncThunk(
  "product/all",
  async (_, thunkAPI) => {
    try {
      const data = await AllSellingProduct();
      console.log(data);
      return data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/remove",
  async (id, thunkAPI) => {
    try {
      const data = await removeProductApi(id);
      toast.success(data.message);
      return id;
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Failed to add product"
      );
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);


export const orderesApi = createAsyncThunk(
  "orders/all",
  async (_, thunkAPI) => {
    try {
      const data = await orderedItemsApi();
      return data.sellerBasedItems;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);


export const updateStatus = createAsyncThunk(
  "update/status",
  async ({ id, status }, thunkAPI) => {
    try {
      const data = await updateStatusApi(id, status);
      toast.success(data.message);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);


export const adminProduct = createSlice({
  name: "adminProduct",
  initialState: {
    sellingProducts: [],
    singleProduct: null,
    orderedItems:[],
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
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleProduct = action.payload;
        state.sellingProducts.push(action.payload); // optional if keeping a list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(allSellingProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(allSellingProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sellingProducts = action.payload;
      })
      .addCase(allSellingProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(removeProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sellingProducts = state.sellingProducts.filter(
          (p) => p._id !== action.payload
        );
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(orderesApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(orderesApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderedItems = action.payload;
      })
      .addCase(orderesApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })


      .addCase(updateStatus.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export const { clearError } = adminProduct.actions;
export default adminProduct.reducer;
