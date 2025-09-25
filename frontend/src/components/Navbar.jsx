import { Icon, MenuIcon, ShoppingBag, ShoppingCart, UserCog, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount } from "../features/cart/cartSelectors";
import logo from "../assets/logo2.png"
import { authUserCheck, selectAuth } from "../features/authentication/authSelectors";
import userLogo from "../assets/user.png"
import { logoutAuth } from "../features/authentication/authSlice";

export function Navbar({ onClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectAuth);
  const auth = useSelector(authUserCheck);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsVisible(false);
      }
    }

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const scrollToSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(sectionId.toLowerCase());
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 500)
  };

  const counts = useSelector(selectCartCount)

  const navItems = ["Home", "Shop", "Categories", "Review", "Support"];
  const menuItems = [
    { name: "Account Settings", label: "account", icon: UserCog, to: "/user/profile" },
    { name: "Order History", label: "orders", icon: ShoppingBag, to: "/order/history" },
    { name: "Log out", label: "logout", icon: LogOut }
  ];

  const handleLogout = (lebel) => {
    if (lebel === "logout") {
      dispatch(logoutAuth());
    }
    setIsVisible(false);
    navigate("/login")
  }


  return (
    <div className={`fixed top-0 left-0 right-0 z-[500] bg-bgGlass backdrop-blur-[20px] border-b border-b-border h-16 ${isScrolled ? "shadow-glass" : ""
      }`}>
      <div className="flex items-center justify-between h-full px-2 md:px-[80px]">
        <div className="flex items-center gap-2 md:gap-4 h-full">
          {auth && <div className="cursor-pointer font-bold text-primary md:hidden" onClick={onClick}>
            <MenuIcon size={24} />
          </div>}
          <div className="h-[85px] w-auto">
            <img src={logo} alt="CltX Logo" className="h-full w-auto" />
          </div>

        </div>

        {auth && <div className="flex items-start gap-10">
          <ul className="gap-6 items-center hidden md:flex h-full">
            {navItems.map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer px-2 py-1"
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item);
                  }}
                  className="relative text-textPrimary font-medium
             after:content-[''] after:absolute after:-bottom-1 after:left-0
             after:h-[2px] after:w-0 after:bg-primary
             after:transition-all after:duration-300 after:ease-in-out
             hover:after:w-full hover:text-primary"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 h-full">
            <div className="relative cursor-pointer flex items-center h-full">
              <div className="w-8 h-8 bg-bgSecondary hover:bg-ring border border-border hover:border-primary/40 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">

                <Link to={"/cart"}>
                  <ShoppingBag
                    size={20}
                    className="absolute text-primary/0 group-hover:text-primary/20 transition-all duration-300"
                    fill="currentColor"
                    stroke="none"
                  />

                  <ShoppingBag
                    size={20}
                    className="relative text-textSecondary group-hover:text-primary transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>

              <span
                className={`absolute -top-2 -right-2 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${counts > 0 ? "flex" : "hidden"
                  }`}
              >
                {counts}
              </span>

            </div>


            <div ref={buttonRef} onClick={() => setIsVisible(!isVisible)} className="flex items-center border-primary border-[3px] w-10 h-10 rounded-full justify-center cursor-pointer overflow-hidden">
              <img
                src={user?.profilePic ? user.profilePic : userLogo}
                alt="Profile"
                className="w-full h-full rounded-full transition-transform duration-300 hover:scale-105"
              />

            </div>
            {isVisible && (
              <div
                ref={menuRef}
                className="hidden md:block absolute top-16 right-4 md:right-20 
               text-textPrimary p-2 rounded-xl shadow-lg bg-bgPrimary"
              >
                <div className="flex flex-col gap-1">
                  {menuItems.map((item, i) => (
                    <Link
                      key={i}
                      to={item.to || "#"}
                      onClick={() => item.label === "logout" && handleLogout(item.label)}
                      className="
                        group flex items-center gap-3 px-4 py-2
                        rounded-lg text-sm font-medium
                        border-l-4 border-transparent
                        hover:border-accent hover:bg-bgSecondary
                        transition-colors duration-200
                      "
                    >
                      <item.icon
                        size={20}
                        className="text-primary group-hover:scale-110 transition-transform duration-200"
                      />
                      <span className="group-hover:text-primary">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}


          </div>
        </div>
        }

      </div>
    </div>
  );
}
