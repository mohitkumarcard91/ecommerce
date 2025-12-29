import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import OrderSummary from "../components/section/orderPlaced/OrderSummary";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.products.cart);
  const user = useSelector((state) => state.auth.user);

  const [showAddress, setShowAddress] = useState(false);

  if (!cart.length) {
    return <p className="text-center mt-10">Cart is empty</p>;
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">{cart.length} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cart.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center pt-4"
          >
            {/* PRODUCT INFO */}
            <div className="flex gap-4">
              <div className="w-24 h-24 border rounded overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <p className="font-semibold">{product.title}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity({
                          userEmail: user.email,
                          productId: product.id,
                        })
                      )
                    }
                    className="px-2 border"
                  >
                    −
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity({
                          userEmail: user.email,
                          productId: product.id,
                        })
                      )
                    }
                    className="px-2 border"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center">₹{product.price * product.quantity}</p>

            <button
              onClick={() =>
                dispatch(
                  removeFromCart({
                    userEmail: user.email,
                    productId: product.id,
                  })
                )
              }
              className="text-red-500 mx-auto"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/")}
          className="mt-8 text-indigo-500 font-medium"
        >
          ← Continue Shopping
        </button>
      </div>

      <OrderSummary totalAmount={totalAmount} cartItems={cart} />
    </div>
  );
};

export default CartPage;
