import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import { Navbar } from "../Navbar";
import { useEffect, useState } from "react";
import { allCart } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/authentication/authSelectors";


export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectAuth);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(user){
      dispatch(allCart());
    }
  },[]);

  return (
    <div className="flex h-16 overflow-hidden bg-bgPrimary text-textPrimary">
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Navbar onClick={() => setIsOpen(!isOpen)} />
        <main className="flex-1 overflow-auto p-6" id="home">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
