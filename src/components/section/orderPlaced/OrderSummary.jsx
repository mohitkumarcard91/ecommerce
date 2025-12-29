import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../../redux/slices/orderSlice";
import { clearCart } from "../../../redux/slices/productSlice";
import AddressSelector from "./AddressSelector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({ totalAmount, cartItems }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [address, setAddress] = useState("");

  const placeOrderHandler = () => {
    if (!address) {
      alert("Please select delivery address");
      return;
    }

    const order = {
      id: Date.now(),
      items: cartItems,
      totalAmount,
      paymentMethod,
      address,
      date: new Date().toLocaleString(),
      status: "Placed",
    };

    dispatch(
      addOrder({
        userEmail: user.email,
        order,
      })
    );

    dispatch(clearCart(user.email));

    alert("Order placed successfully ✅");
    navigate("/successfullyOrderPlaced");
  };

  return (
    <div className="max-w-[360px] w-full bg-gray-100/40 p-5 border">
      <h2 className="text-xl font-medium">Order Summary</h2>
      <hr className="my-5" />

      <p className="text-sm font-medium uppercase">Delivery Address</p>
      <AddressSelector
        selectedAddress={address}
        setSelectedAddress={setAddress}
      />

      <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full border px-3 py-2 mt-2"
      >
        <option>Cash On Delivery</option>
      </select>

      <hr className="my-5" />

      <div className="space-y-2 text-gray-500">
        <p className="flex justify-between">
          <span>Price</span>
          <span>₹{totalAmount}</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </p>
        <p className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </p>
      </div>

      <button
        onClick={placeOrderHandler}
        className="mt-6 w-full px-6 py-2 bg-indigo-600 text-white rounded-md
        transition-all duration-300 hover:bg-white hover:text-indigo-600 border"
      >
        Place Order
      </button>
    </div>
  );
}
