import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constant/config";

const getUserData = (key, userEmail) => {
  const data = JSON.parse(localStorage.getItem(key)) || {};
  return data[userEmail] || [];
};

const setUserData = (key, userEmail, value) => {
  const data = JSON.parse(localStorage.getItem(key)) || {};
  data[userEmail] = value;
  localStorage.setItem(key, JSON.stringify(data));
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products`);
      return response.data.products;
    } catch (err) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

const initialState = {
  allProducts: JSON.parse(localStorage.getItem("allProducts")) || [],
  cart: [],
  wishlist: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadUserData(state, action) {
      const userEmail = action.payload;
      state.cart = getUserData("cartItem", userEmail);
      state.wishlist = getUserData("wishlistItem", userEmail);
    },

    addToCart(state, action) {
      const { userEmail, product } = action.payload;

      let cartProducts = getUserData("cartItem", userEmail);

      const existingProduct = cartProducts.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartProducts.push({
          ...product,
          quantity: 1,
        });
      }

      setUserData("cartItem", userEmail, cartProducts);

      state.cart = cartProducts;
    },
    increaseQuantity(state, action) {
      const { userEmail, productId } = action.payload;
      let cart = getUserData("cartItem", userEmail);

      const item = cart.find((p) => p.id === productId);
      if (item) item.quantity += 1;

      setUserData("cartItem", userEmail, cart);
      state.cart = cart;
    },

    decreaseQuantity(state, action) {
      const { userEmail, productId } = action.payload;
      let cart = getUserData("cartItem", userEmail);

      const item = cart.find((p) => p.id === productId);
      if (item && item.quantity > 1) item.quantity -= 1;

      setUserData("cartItem", userEmail, cart);
      state.cart = cart;
    },
    clearCart(state, action) {
  const userEmail = action.payload;
  const data = JSON.parse(localStorage.getItem("cartItem")) || {};
  data[userEmail] = [];
  localStorage.setItem("cartItem", JSON.stringify(data));
  state.cart = [];
}
,
    removeFromCart(state, action) {
      const { userEmail, productId } = action.payload;
      let cartProducts = getUserData("cartItem", userEmail);
      cartProducts = cartProducts.filter((p) => p.id !== productId);
      setUserData("cartItem", userEmail, cartProducts);
      state.cart = cartProducts;
    },

    toggleWishlist(state, action) {
      const { userEmail, product } = action.payload;
      let wishlistProducts = getUserData("wishlistItem", userEmail);
      const index = wishlistProducts.findIndex((p) => p.id === product.id);

      if (index >= 0) wishlistProducts.splice(index, 1);
      else wishlistProducts.push(product);

      setUserData("wishlistItem", userEmail, wishlistProducts);
      state.wishlist = wishlistProducts;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        localStorage.setItem("allProducts", JSON.stringify(action.payload));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCart = (state) => state.products.cart;

export const {
  addToCart,
  removeFromCart,
  toggleWishlist,
    clearCart,

  loadUserData,
  increaseQuantity,
  decreaseQuantity,
} = productsSlice.actions;

export default productsSlice.reducer;
