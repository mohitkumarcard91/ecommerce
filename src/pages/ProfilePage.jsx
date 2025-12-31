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
      <div className="fixed inset-0 bg-black/30" />

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

// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { NavLink } from 'react-router-dom'

// export default function ProfilePage({isOpen, onClose,user}) {
//   return (
//     <Menu as="div" className="relative inline-block">
//       <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//         {user}
//       </MenuButton>

//       <MenuItems
//         transition
//         className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline outline-1 outline-black/5 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
//       >
//         <div className="py-1">
//           <MenuItem>
//             <NavLink
//               to="/orderHistory"
//               className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
//             >
//              Order History
//             </NavLink>
//           </MenuItem>
//           <MenuItem>
//             <a
//               href="#"
//               className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
//             >
//               Support
//             </a>
//           </MenuItem>

//         </div>
//       </MenuItems>
//     </Menu>
//   )
// }
