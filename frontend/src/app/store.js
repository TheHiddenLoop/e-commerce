import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
import productReducer from "../features/products/productSlice"
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/OrderSlice"
import adminProductReducer from "../features/admin/adminSlice"



export const store = configureStore({
  reducer: {
    auth: authReducer, 
    product:productReducer,
    cart: cartReducer,
    order: orderReducer,
    adminProduct: adminProductReducer,
  },
});