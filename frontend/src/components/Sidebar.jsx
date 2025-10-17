import {
  X,
  Home,
  ShoppingBag,
  Grid3X3,
  Zap,
  ShoppingCart,
  User,
  Headphones,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../context/Theme";
import logo3 from "../assets/logo3.png"
import { logoutAuth } from "../features/authentication/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUserCheck } from "../features/authentication/authSelectors";

export function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { icon: Home, label: "Home", to: "/" },
    { icon: ShoppingBag, label: "Shop", to: "/products" },
    { icon: ShoppingCart, label: "Cart", to: "/cart" },
    { icon: User, label: "Profile", to: "/user/profile" },
  ];

  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout = () => {
        dispatch(logoutAuth());
      navigate("/login");
    };

      const auth = useSelector(authUserCheck);


  return (
    <>
      {auth&&isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[500]"
          onClick={onClose}
        />
      )}

      {auth&&<div
        className={`fixed top-0 left-0 h-full w-64 bg-bgSecondary shadow-skin border-r border-border z-[1000] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 border-b border-border">
          <div className="h-[70px] w-auto">
            <img
              src={logo3}
              alt="CltX Logo"
              className="h-full w-auto object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-border hover:bg-ring rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <X
              size={18}
              className="text-textSecondary hover:text-textPrimary transition-colors duration-200"
            />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                to={item.to}
                key={item.label}
                className="flex items-center space-x-3 p-3 font-semibold rounded-lg hover:bg-ring cursor-pointer transition-colors duration-200 group"
              >
                <Icon
                  size={20}
                  className="text-textSecondary group-hover:text-accent transition-colors duration-200"
                />
                <span className="text-textPrimary  group-hover:text-accent font-poppins transition-colors duration-200">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border flex items-center justify-between">
          <div className="bg-primary/10 hover:bg-ring border border-primary/20 rounded-lg p-3">
            <button className="flex items-center gap-2" onClick={handleLogout}>
              <LogOut /> Logout
            </button>
          </div>
          <div className="hover:bg-ring border border-primary rounded-lg ">
            <button
              onClick={() => toggleDarkMode(!darkMode)}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 rounded-lg px-4 py-2 transition"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" fill="#8B5CF6"/>
              ) : (
                <Moon className="w-6 h-6" fill="#8B5CF6"/>
              )}
            </button>
          </div>
        </div>
      </div>}
    </>
  );
}
