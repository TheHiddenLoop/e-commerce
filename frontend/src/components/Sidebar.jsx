import { X, Home, ShoppingBag, Grid3X3, Zap, ShoppingCart, User, Headphones } from "lucide-react";

export function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: ShoppingBag, label: "Shop" },
    { icon: Grid3X3, label: "Categories" },
    { icon: Zap, label: "Deals" },
    { icon: ShoppingCart, label: "Cart" },
    { icon: User, label: "Profile" },
    { icon: Headphones, label: "Support" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[500]"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-bgSecondary shadow-skin border-r border-border z-[1000] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 border-b border-border">
          <div className="h-[70px] w-auto">
            <img src="logo3.png" alt="CltX Logo" className="h-full w-auto object-cover" />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-border hover:bg-ring rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            <X size={18} className="text-textSecondary hover:text-textPrimary transition-colors duration-200" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
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
              </div>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <div className="text-sm font-medium text-textPrimary font-poppins">
              Premium Account
            </div>
            <div className="text-xs text-textSecondary mt-1">
              Enjoy exclusive benefits
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
