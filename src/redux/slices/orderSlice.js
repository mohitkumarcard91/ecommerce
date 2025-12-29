import { createSlice } from "@reduxjs/toolkit";

const getUserData = (key, userEmail) => {
  const data = JSON.parse(localStorage.getItem(key)) || {};
  return data[userEmail] || [];
};

const setUserData = (key, userEmail, value) => {
  const data = JSON.parse(localStorage.getItem(key)) || {};
  data[userEmail] = value;
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState = {
  orderHistory: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    loadOrderHistory(state, action) {
      const userEmail = action.payload;
      state.orderHistory = getUserData("orderHistory", userEmail);
    },

    addOrder(state, action) {
      const { userEmail, order } = action.payload;
      const userOrders = getUserData("orderHistory", userEmail);
      userOrders.push(order);
      setUserData("orderHistory", userEmail, userOrders);
      state.orderHistory = userOrders;
    },

    clearOrderHistory(state, action) {
      const userEmail = action.payload;
      setUserData("orderHistory", userEmail, []);
      state.orderHistory = [];
    },
    cancelOrder(state, action) {
      const { userEmail, orderId } = action.payload;

      const userOrders = getUserData("orderHistory", userEmail);

      const updatedOrders = userOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: "Cancelled", isPaid: false }
          : order
      );

      setUserData("orderHistory", userEmail, updatedOrders);
      state.orderHistory = updatedOrders;
    },
  },
});

export const { loadOrderHistory, addOrder, clearOrderHistory, cancelOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
