import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Suspense } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import React from "react";

// Auth selectors
import {
  selectAuth,
  authUserCheck,
  selectAuthStatusCheck,
} from "./features/authentication/authSelectors";
import { checkAuth } from "./features/authentication/authSlice";

import {
  authAdminCheck,
  selectAdminAuthStatusCheck,
} from "./features/admin/adminAuth/adminAuthSelectors";
import { checkAdminAuth } from "./features/admin/adminAuth/adminAuthSlice";

// Layouts
import Layout from "./components/UI/Layout";
import AdminLayout from "./components/layout/AdminLayout";

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const Cart = React.lazy(() => import("./pages/Cart"));
const ShopPage = React.lazy(() => import("./pages/ShopPage"));
const ProductDetails = React.lazy(() => import("./pages/ProductDetails"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const OrderHistory = React.lazy(() => import("./pages/OrderHistory"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));

const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const ForgetPassword = React.lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const VerifyOtp = React.lazy(() => import("./pages/VerifyOtp"));

const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const VerifyAdmin = React.lazy(() => import("./pages/admin/VerifyAdmin"));
const Dashboard = React.lazy(() => import("./components/admin/Dashboard"));
const AllProductsList = React.lazy(() => import("./components/admin/AllProductsList"));
const AddProducts = React.lazy(() => import("./components/admin/AddProducts"));
const Orders = React.lazy(() => import("./components/admin/Orders"));

export default function Page() {
  const dispatch = useDispatch();

  const user = useSelector(selectAuth);
  const userStatus = useSelector(selectAuthStatusCheck);
  const isUserAuthenticated = useSelector(authUserCheck);

  const admin = useSelector(authAdminCheck);
  const adminStatus = useSelector(selectAdminAuthStatusCheck);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(checkAdminAuth());
  }, [dispatch]);

  // Show loader while either check is pending
  if (
    (userStatus === "loading" && !isUserAuthenticated) ||
    (adminStatus === "loading" && !admin)
  ) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-bgSecondary">
      <Toaster />
      <Layout />
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-40">
            <Loader className="w-10 h-10 animate-spin" />
          </div>
        }
      >
        <Routes>
          {/* ---------- USER ROUTES ---------- */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" replace />} />
          <Route path="/products" element={user ? <ShopPage /> : <Navigate to="/login" replace />} />
          <Route path="/product-details/:id" element={user ? <ProductDetails /> : <Navigate to="/login" replace />} />
          <Route path="/order" element={user ? <CheckoutPage /> : <Navigate to="/login" replace />} />
          <Route path="/order/history" element={user ? <OrderHistory /> : <Navigate to="/login" replace />} />
          <Route path="/user/profile" element={user ? <ProfilePage /> : <Navigate to="/login" replace />} />

          {/* ---------- ADMIN ROUTES ---------- */}
          <Route path="/admin" element={admin ? <AdminLayout /> : <Navigate to="/admin/login" replace />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add/products" element={<AddProducts />} />
            <Route path="product/list" element={<AllProductsList />} />
            <Route path="all-orders" element={<Orders />} />
          </Route>

          {/* ---------- AUTH PAGES ---------- */}
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* ---------- ADMIN AUTH ---------- */}
          <Route path="/admin/login" element={admin ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} />
          <Route path="/admin/verify" element={admin ? <Navigate to="/admin/dashboard" replace /> : <VerifyAdmin />} />

          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </main>
  );
}
