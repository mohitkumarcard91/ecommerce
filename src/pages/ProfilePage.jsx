import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import LogoutPage from "./LogoutPage";

export default function ProfilePage({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
      <div
        ref={modalRef}
        className="fixed top-20 right-10 z-50 w-[320px] rounded-2xl bg-white shadow-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-4">My Account</h2>

        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="font-medium truncate">{user.email}</p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              navigate("/orderHistory");
              onClose();
            }}
            className="text-left hover:bg-gray-100 px-3 py-2 rounded-lg"
          >
            📦 Order History
          </button>

          <button
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
            className="text-left hover:bg-gray-100 px-3 py-2 rounded-lg"
          >
            👤 Profile
          </button>

          <div className="pt-3 border-t">
            <LogoutPage />
          </div>
        </div>
      </div>
    </div>
  );
}
