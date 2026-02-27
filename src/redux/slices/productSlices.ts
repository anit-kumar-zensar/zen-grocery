/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../../constants/api";

type Product = {
    id:string;
    name:string;
    price:number;
    category:string;
    imageUrl:string
}
type CartItem = Product & {
  quantity: number;
};
interface ProductState {
  products: Product[];
  cart: CartItem[];
  itemCounts: number;
  isCartPageOpen: boolean;
  loading: boolean;
  error: string | null;
}
const initialState:ProductState  = {
  products: [],
  cart: [],
  itemCounts: 0,
  isCartPageOpen: false,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  string[] | undefined
>(
  "products/fetchProducts",
  async (categories, thunkAPI) => {
    try {
      let url = `${API_ENDPOINTS.PRODUCTS}`;

      if (categories && categories.length > 0) {
        url += `?category=${categories.join(",")}`;
      }

      const response = await axios.get(url);
      return response.data.products as Product[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const {
  getProducts,
  addToCart,
  removeCart,
} = productSlice.actions;
export default productSlice.reducer;
