import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { selectAuth, authUserCheck, selectAuthStatusCheck } from "./features/authentication/authSelectors";
import { checkAuth } from "./features/authentication/authSlice";

import { selectAdmin, selectAdminAuthStatusCheck, authAdminCheck } from "./features/admin/adminAuth/adminAuthSelectors";
import { checkAdminAuth } from "./features/admin/adminAuth/adminAuthSlice";

import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import ShopPage from "./pages/ShopPage";
import { ProductDetails } from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistory from "./pages/OrderHistory";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgetPassword } from "./pages/ForgetPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { VerifyOtp } from "./pages/VerifyOtp";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { VerifyAdmin } from "./pages/admin/VerifyAdmin";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import AllProductsList from "./components/admin/AllProductsList";
import AddProducts from "./components/admin/AddProducts";
import Orders from "./components/admin/Orders";

import Layout from "./components/UI/Layout";
import ProfilePage from "./pages/ProfilePage";

export default function Page() {
  const dispatch = useDispatch();

  const user = useSelector(selectAuth);
  const userStatus = useSelector(selectAuthStatusCheck);
  const isUserAuthenticated = useSelector(authUserCheck);

  const admin = useSelector(authAdminCheck);
  const adminStatus = useSelector(selectAdminAuthStatusCheck);

  useEffect(() => {
  dispatch(checkAuth());
}, [dispatch]);  // Runs ONLY for user

useEffect(() => {
  dispatch(checkAdminAuth());
}, [dispatch]);  // Runs ONLY for admin


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
      {/* <AuthNotifier /> */}

      <Routes>
        {/* ---------- USER ROUTES ---------- */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/products"
          element={user ? <ShopPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/product-details/:id"
          element={user ? <ProductDetails /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/order"
          element={user ? <CheckoutPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/order/history"
          element={user ? <OrderHistory /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/user/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" replace />}
        />

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route
          path="/admin"
          element={admin ? <AdminLayout /> : <Navigate to="/admin/login" replace />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add/products" element={<AddProducts />} />
          <Route path="product/list" element={<AllProductsList />} />
          <Route path="all-orders" element={<Orders />} />
        </Route>

        {/* ---------- AUTH PAGES ---------- */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* ---------- ADMIN AUTH ---------- */}
        <Route
          path="/admin/login"
          element={admin ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />}
        />
        <Route
          path="/admin/verify"
          element={admin ? <Navigate to="/admin/dashboard" replace /> : <VerifyAdmin />}
        />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}