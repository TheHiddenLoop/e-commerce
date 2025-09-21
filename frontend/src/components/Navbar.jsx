import { MenuIcon, ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../features/cart/cartSelectors";
import logo from "../assets/logo2.png"
import { selectAuth } from "../features/authentication/authSelectors";
import userLogo from "../assets/user.png"

export function Navbar({ onClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const user=useSelector(selectAuth);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);  

  const scrollToSection = (sectionId) => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(sectionId.toLowerCase());
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 500)
  };

  const counts = useSelector(selectCartCount)

  const navItems = ["Home", "Shop", "Categories", "Review", "Support"];

  return (
    <div className={`fixed top-0 left-0 right-0 z-[500] bg-bgGlass backdrop-blur-[20px] border-b border-b-border h-16 ${isScrolled ? "shadow-glass" : ""
      }`}>
      <div className="flex items-center justify-between h-full px-2 md:px-[80px]">
        <div className="flex items-center gap-2 md:gap-4 h-full">
          <div className="cursor-pointer font-bold text-primary md:hidden" onClick={onClick}>
            <MenuIcon size={24} />
          </div>
          <div className="h-[85px] w-auto">
            <img src={logo} alt="CltX Logo" className="h-full w-auto" />
          </div>

        </div>

        <div className="flex items-start gap-10">
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


            <div className="flex items-center border-primary border-[3px] w-10 h-10 rounded-full justify-center cursor-pointer overflow-hidden">
              <img
                src={user.profilePic ? user.profilePic : userLogo}
                alt="Profile"
                className="w-full h-full rounded-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
