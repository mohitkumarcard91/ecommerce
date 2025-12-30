import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useState } from "react";

export default function LogoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const logoutHandle = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div  className="px-6 py-2 bg-indigo-600 text-white rounded-md 
             border border-blue-600 
             transition-all duration-300
             hover:bg-white hover:text-indigo-600">
      <button onClick={() => setModal(true)}>Logout</button>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setModal(false)}
                className="px-6 py-2 bg-gray-300 text-black border border-gray-300 rounded-md hover:bg-white transition-all duration-300 hover:text-gray-300"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-indigo-600 text-white rounded-md 
             border border-blue-600 
             transition-all duration-300
             hover:bg-white hover:text-indigo-600"
                onClick={logoutHandle}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
