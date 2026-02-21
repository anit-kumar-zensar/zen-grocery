import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from './slices/productSlices'

export const store = configureStore({
    reducer:ProductReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch