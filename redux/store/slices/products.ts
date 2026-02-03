import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../client/src/interface";
import fetchProductsThunk from "../thunks/products";




interface ProductState{
  products: Product[],
  loading: boolean,
  error: string | null
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
}


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
      .addCase( fetchProductsThunk.pending, (state)=>{
        state.loading = true
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action)=>{
        state.loading = false,
        state.products = action.payload,
        state.error = null
      })
      .addCase(fetchProductsThunk.rejected, (state, action)=>{
        state.loading = false,
        state.products = [],
        state.error = action.error.message! || action.payload!
      })
  }
})


export default productsSlice.reducer ;