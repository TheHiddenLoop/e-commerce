import { Routes, Route, Navigate } from "react-router-dom";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Login } from "./pages/Login";
import { ResetPassword } from "./pages/ResetPassword";
import { Signup } from "./pages/Signup";
import { VerifyOtp } from "./pages/VerifyOtp";
import { Home } from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, authUserCheck, selectAuthStatus, selectAuthStatusCheck } from "./features/authentication/authSelectors";
import { checkAuth } from "./features/authentication/authSlice";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import {Toaster} from "react-hot-toast"
import {AuthNotifier} from "./components/UI/AuthNotifier"
import { Navbar } from "./components/Navbar";
import Layout from "./components/UI/Layout";
import {Cart} from "./pages/Cart"
import ShopPage from "./pages/ShopPage";
import { ProductDetails } from "./pages/ProductDetails";
import Order from "./components/Order";

export default function Page() {
  const dispatch = useDispatch();

  const authUser = useSelector(selectAuth);
  const statusCheck = useSelector(selectAuthStatusCheck);
  const auth = useSelector(authUserCheck);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  if (statusCheck === "loading" && !auth) {
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
      <AuthNotifier />
      <Routes>
        <Route
          path="/"
          element={auth ? <Home /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/cart"
          element={auth ? <Cart /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/products"
          element={auth ? <ShopPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/product-details/:id"
          element={auth ? <ProductDetails /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/order"
          element={auth ? <Order /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={auth ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={auth ? <Navigate to="/" replace /> : <Signup />}
        />

        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
