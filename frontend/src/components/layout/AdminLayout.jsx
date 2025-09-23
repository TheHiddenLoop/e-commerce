import { Outlet } from "react-router-dom"
import Sidebar from "../../pages/admin/Sidebar"
import { Navbar } from "../Navbar"
import { AdminNavbar } from "../admin/AdminNavBar"

export default function AdminLayout() {
  return (
    <div className="flex flex-col max-h-[calc(100vh-65px)]">
      <AdminNavbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4" style={{scrollbarWidth:"none"}}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
