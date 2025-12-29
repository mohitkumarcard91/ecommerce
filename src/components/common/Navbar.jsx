import { Menu, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

import { selectUser } from "../../redux/slices/authSlice";
import LogoutPage from "../../pages/LogoutPage";
import LoginPage from "../../pages/LoginPage";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.products.cart);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <a href="/">
        <h1 className="text-xl font-semibold">E-commerce</h1>
      </a>

      <button aria-label="Menu" id="menu-toggle" className="sm:hidden">
        <Menu />
      </button>

      <div
        id="mobile-menu"
        className="hidden absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden"
      >
        <a href="/" class="block">
          Home
        </a>

        <a href="/orderHistory" class="block">
          Order History
        </a>
        <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
          {user ? <LogoutPage /> : <LoginPage />}
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline text-blue-600" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/orderHistory"
          className={({ isActive }) =>
            isActive ? "underline text-blue-600" : ""
          }
        >
          Order History
        </NavLink>
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <SearchBar />
        </div>

        <div className="relative cursor-pointer">
          <a href="/cart">
            <ShoppingCart className="w-8 h-10" />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              <span>{cart.length == 0 ? 0 : cart.length}</span>
            </button>
          </a>
        </div>

        <button
          className="px-6 py-2 bg-indigo-600 text-white rounded-md 
             border border-blue-600 
             transition-all duration-300
             hover:bg-white hover:text-indigo-600"
        >
          {user ? <LogoutPage /> : <LoginPage />}
        </button>
      </div>
    </nav>
  );
}
