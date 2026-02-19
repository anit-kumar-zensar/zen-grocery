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
      const item = action.payload;
      const existingItem = state.cart.find((p) => p.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    removeCart: (state, action) => {
      const id = action.payload;

      const existingItem = state.cart.find((p) => p.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter((p) => p.id !== id);
        }
      }
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
