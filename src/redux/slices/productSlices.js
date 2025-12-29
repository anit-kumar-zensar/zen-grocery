import { createSlice } from "@reduxjs/toolkit";
import { products } from "../../mocks/products";

const initialState = {
  products: [...products],
  cart: [],
  itemCounts: 0,
  isCartPageOpen: false,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
    },
    getItemCount: (state, action) => {
      state.itemCounts = state.cart.length;
    },
    isCartPageOpen: (state, action) => {
      state.isCartPageOpen = !state.isCartPageOpen;
    },
  },
});
export const {
  getProducts,
  addToCart,
  removeCart,
  getItemCount,
  isCartPageOpen,
} = productSlice.actions;
export default productSlice.reducer;
