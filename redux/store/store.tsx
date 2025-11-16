//createStore object

import {configureStore} from '@reduxjs/toolkit'
import productsSlice from './slice/products'
import productSlide from './slice/product'

const store = configureStore({
    reducer: {
        products: productsSlice,
        product: productSlide
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;