import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Successfull() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 text-center">
        <CircleCheck size={80} className="mx-auto text-blue-600" />

        <h1 className="text-2xl font-semibold mt-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Your order has been placed successfully.
          <br />
          You can now return to the homepage and discover new products.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md 
             border border-blue-600 
             transition-all duration-300
             hover:bg-white hover:text-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
