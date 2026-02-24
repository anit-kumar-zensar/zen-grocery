import {configureStore,combineReducers } from '@reduxjs/toolkit';
import productReducer from './slices/productSlices';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});
export const store = configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch