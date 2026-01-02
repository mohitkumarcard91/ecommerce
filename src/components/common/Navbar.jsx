import { Menu, ShoppingCart, User, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../../redux/slices/authSlice";
import LoginPage from "../../pages/LoginPage";
import SearchBar from "./SearchBar";
import ProfilePage from "../../pages/ProfilePage";

export default function Navbar() {
  const user = useSelector(selectUser);
  const cart = useSelector((state) => state.products.cart);
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative z-30">
        <NavLink to="/">
          <h1 className="text-xl font-semibold">E-commerce</h1>
        </NavLink>

        <button
          aria-label="Menu"
          className="sm:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-[64px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 text-sm sm:hidden">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink
              to="/orderHistory"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order History
            </NavLink>

            {user ? (
              <button
                onClick={() => {
                  setProfileOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                <User className="w-5 h-5" />
                {user.email.split("@")[0]}
              </button>
            ) : (
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Login
              </button>
            )}
          </div>
        )}

        <div className="hidden sm:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-medium" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/orderHistory"
            className={({ isActive }) =>
              isActive ? "text-indigo-600 font-medium" : ""
            }
          >
            Order History
          </NavLink>

          <div className="hidden lg:flex items-center border border-gray-300 px-3 rounded-full">
            <SearchBar />
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-8 h-8" />
            {cart.length === 0 ? (
              ""
            ) : (
              <span className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          <button
            onClick={() => (user ? setProfileOpen(true) : setLoginOpen(true))}
            className="px-5 py-2 bg-indigo-600 text-white rounded-md
  border border-indigo-600 transition-all duration-300
  hover:bg-white hover:text-indigo-600"
          >
            {user ? (
              <div className="flex items-center gap-2 text-inherit">
                <User className="w-5 h-5" />
                {user.email.split("@")[0]}
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </nav>

      <ProfilePage
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={`${user.email.split("@")[0]}`}
      />

      {loginOpen && <LoginPage onClose={() => setLoginOpen(false)} />}
    </>
  );
}
