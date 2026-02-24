import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants/api";

interface CartItem {
   _id?: string;
  productId: string;
  quantity?: number;
}

interface CartState {
  carts: CartItem[];
  status: 'idle' | 'loading' | 'failed';
  itemCounts: number;
  isCartPageOpen: boolean;
}

const initialState: CartState = {
  status: 'idle',
  carts: [],
  itemCounts: 0,
  isCartPageOpen: false,
};

// Fetch cart from API
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const res = await axios.get(`${API_ENDPOINTS.CART_DETAILS}`);
  return res?.data; 
});

// Add item to cart
export const addToCartAPI = createAsyncThunk( 
  'cart/addToCart',
  async (productId: string) => {
    await axios.post(`${API_ENDPOINTS.ADD_TO_CART}`, {productId} );
     const cartDetails = await axios.get(`${API_ENDPOINTS.CART_DETAILS}`);
    return cartDetails.data;
  }
);

// Remove item from cart
export const removeFromCartAPI = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string) => {
    await axios.delete(`${API_ENDPOINTS.REMOVE_FROM_CART}/${productId}`);
     const cartDetails = await axios.get(`${API_ENDPOINTS.CART_DETAILS}`);
    return cartDetails.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getItemCount: (state) => {
      state.itemCounts = state?.carts?.length;
    },
    isCartPageOpen: (state) => {
      state.isCartPageOpen = !state.isCartPageOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.itemCounts = state?.carts?.length;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
         state.carts = action.payload;  
         state.itemCounts = state?.carts?.length;
       })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.itemCounts = state?.carts?.length;
      });
  },
});

export const {getItemCount,isCartPageOpen} = cartSlice.actions;
export default cartSlice.reducer;