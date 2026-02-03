//createStore object

import {configureStore} from '@reduxjs/toolkit'
import productsSlice from './slices/products'
import productSlice from './slices/product'
import commentSlice from './slices/comment'
import userSlice from './slices/user'

const store = configureStore({
    reducer: {
        products: productsSlice,
        product: productSlice,
        comments: commentSlice, 
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;


