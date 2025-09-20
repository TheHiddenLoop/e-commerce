import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  AlignRight,
  Menu,
  LogOut,
  PackagePlus,
  PackageSearch,
  LayoutDashboard,
  Package,
} from "lucide-react"

const sidebarItems = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "dashboard" },
  { id: "date", name: "Add Products", icon: PackagePlus, path: "add/products" },
  { id: "create", name: "All Products", icon: PackageSearch, path: "product/list" },
  { id: "order", name: "All Orders", icon: Package, path: "all-orders" },

]


export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation();

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-[radial-gradient(circle_at_10%_80%,rgba(100,116,139,0.1)_0%,transparent_50%),radial-gradient(circle_at_90%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)] border-r border-border transition-skin duration-300 ease-in-out flex-shrink-0 flex flex-col min-h-[calc(100vh-65px)]`}
    >
      <div className="flex flex-col flex-1 pt-6">
        <div className="flex items-center justify-between px-4 mb-6">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-primary flex items-center gap-1">
              CltX
            </h2>
          )}
          <button
            className="text-textSecondary hover:text-primary p-2 rounded transition-colors"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <AlignRight className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                } py-2 my-3 rounded-md text-left transition-colors border-l-4 ${
                  isActive
                    ? "border-primary bg-secondary text-primary font-bold"
                    : "border-transparent font-semibold text-textPrimary hover:border-accent hover:bg-bgSecondary hover:text-primary"
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-primary" : "text-textPrimary"
                  }`}
                />
                {!isCollapsed && item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-border p-3">
        <button
          className={`w-full flex items-center ${
            isCollapsed ? "justify-center" : "gap-3"
          } py-2 rounded-md text-left text-textSecondary font-semibold hover:text-error hover:bg-bgSecondary border-l-4 border-transparent hover:border-error transition-colors`}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </aside>
  )
}
