import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadOrderHistory,
  cancelOrder,
} from "../../../redux/slices/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.order?.orderHistory || []);

  useEffect(() => {
    if (user?.email) {
      dispatch(loadOrderHistory(user.email));
    }
  }, [dispatch, user?.email]);

  // useEffect(() => {
  //   console.log("Orders updated:", orders);
  // }, [orders]);

  const cancelOrderHandler = (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    dispatch(
      cancelOrder({
        userEmail: user.email,
        orderId,
      })
    );
  };

  if (!orders.length) {
    return <p className="text-center text-gray-500 mt-10">No orders found</p>;
  }

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Order History</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] 
          gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex gap-5">
            <div>
              {order.items.map((item, i) => (
                <div className="flex gap-5 mb-3">
                  <img
                    className="w-12 h-12 object-cover"
                    src={item.images?.[0] || boxIcon}
                    alt={item.title}
                  />

                  <div>
                    <p key={i} className="font-medium">
                      {item.title}
                      {item.quantity > 1 && (
                        <span className="text-indigo-500">
                          {" "}
                          x {item.quantity}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">{order.address}</p>
          </div>

          <p className="font-medium text-base my-auto">₹{order.totalAmount}</p>

          <div className="text-sm space-y-1">
            <p>Method: {order.paymentMethod}</p>
            <p>Date: {order.date}</p>

            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium
              ${
                order.status === "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {order.status}
            </span>

            {order.status !== "Cancelled" && (
              <button
                onClick={() => cancelOrderHandler(order.id)}
                className="block mt-2 text-red-500 hover:underline"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
