import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../redux/slices/authSlice";

export default function ProfilePage({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logoutHandle = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    onClose();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !showLogoutModal
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, showLogoutModal]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

      {/* PROFILE MODAL */}
      <div
        ref={modalRef}
        className="fixed top-20 right-10 z-50 w-[320px] rounded-2xl bg-white shadow-2xl p-6"
      >
        <h2 className="text-lg font-semibold mb-4">My Account</h2>

        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="font-medium truncate">{user?.email}</p>
        </div>

        <div className="flex flex-col gap-3 mb-4">
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
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full px-6 py-2 bg-indigo-600 text-white rounded-md 
          border border-indigo-600 transition-all duration-300
          hover:bg-white hover:text-indigo-600"
        >
          Logout
        </button>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 bg-gray-300 text-black rounded-md 
                hover:bg-gray-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={logoutHandle}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md 
                border border-indigo-600 transition-all duration-300
                hover:bg-white hover:text-indigo-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
