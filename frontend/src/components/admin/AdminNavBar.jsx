import logo from "../../assets/logo2.png";
import userLogo from "../../assets/admin.png";
import { useDarkMode } from "../../context/Theme";
import { Sun, Moon } from "lucide-react";

export function AdminNavbar() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[500] bg-bgPrimary backdrop-blur-[20px] border-b border-b-border h-16`}
    >
      <div className="flex items-center justify-between h-full px-2 md:px-[80px]">
        <div className="flex items-center gap-2 md:gap-4 h-full">
          <div className="h-[85px] w-auto">
            <img src={logo} alt="CltX Logo" className="h-full w-auto" />
          </div>
        </div>

        <div className="flex items-center gap-4 h-full">
            <button
              onClick={() => toggleDarkMode(!darkMode)}
              className="flex items-center text-white gap-2 bg-primary/10 hover:bg-primary/20 rounded-lg px-4 py-2 transition"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" fill="#8B5CF6" />
              ) : (
                <Moon className="w-6 h-6 text-black" fill="#8B5CF6" />
              )}
            </button>
          <div className="flex items-center border-primary border-[3px] w-10 h-10 rounded-full justify-center cursor-pointer overflow-hidden">
            <img
              src={userLogo}
              alt="Profile"
              className="w-full h-full rounded-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
