import {configureStore} from '@reduxjs/toolkit';
import ProductReducer from './slices/productSlices'

export const store = configureStore({
    reducer:ProductReducer
})
