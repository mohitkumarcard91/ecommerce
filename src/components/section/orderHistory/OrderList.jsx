import { useEffect, useState } from "react";
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

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      dispatch(loadOrderHistory(user.email));
    }
  }, [dispatch, user?.email]);

  const openCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setCancelModalOpen(true);
  };

  const confirmCancel = () => {
    dispatch(
      cancelOrder({
        userEmail: user.email,
        orderId: selectedOrderId,
      })
    );
    setCancelModalOpen(false);
    setSelectedOrderId(null);
  };

  if (!orders.length) {
    return (
      <p className="text-center text-gray-500 mt-16 text-lg">
        No orders found
      </p>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-6">
        <h2 className="text-2xl font-semibold">Order History</h2>

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-sm
            border border-gray-200 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <p className="text-sm text-gray-500">
                Order Date:
                <span className="ml-1 font-medium text-gray-800">
                  {order.date}
                </span>
              </p>

              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                ${
                  order.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid gap-6
              grid-cols-1
              md:grid-cols-[2fr_1fr_1fr]"
            >
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b
                    last:border-none pb-4 last:pb-0"
                  >
                    <img
                      src={item.images?.[0] || boxIcon}
                      alt={item.title}
                      className="w-14 h-14 rounded-md object-cover border"
                    />

                    <div>
                      <p className="font-medium text-gray-800">
                        {item.title}
                      </p>

                      {item.quantity > 1 && (
                        <p className="text-sm text-indigo-600">
                          Qty: {item.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-sm space-y-4">
                <div>
                  <p className="text-gray-500">Delivery Address</p>
                  <p className="font-medium text-gray-800">
                    {order.address}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-800">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total</p>
                  <p className="text-xl font-semibold text-gray-900">
                    ₹{order.totalAmount.toFixed(2)}
                  </p>
                </div>

                {order.status !== "Cancelled" && (
                  <button
                    onClick={() => openCancelModal(order.id)}
                    className="mt-4 text-sm font-medium text-red-600
                    hover:underline self-start"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {cancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6">
            <h3 className="text-lg font-semibold mb-3">
              Cancel Order?
            </h3>

            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this order?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                Keep Order
              </button>

              <button
                onClick={confirmCancel}
                className="px-4 py-2 rounded-md border border-red-600 bg-red-600
                text-white  font-medium hover:bg-white hover:text-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderList;
