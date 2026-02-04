import { createSlice} from "@reduxjs/toolkit";
import fetchProductThunk from '../thunks/product.ts'
import { Product } from "../../../src/interface";


interface ProductStateType {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductStateType = {
  product: null,
  loading: false,
  error: null,
};


const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
        .addCase(fetchProductThunk.pending, (state)=>{
          state.loading = true
        })
        .addCase(fetchProductThunk.fulfilled, (state, action)=>{
          state.loading = false
          state.product = action.payload
          state.error = null
        })
        .addCase(fetchProductThunk.rejected, (state, action)=>{
          state.loading = false
          state.error = action.error.message! || action.payload!
          state.product = null
        })
  }
});


export default ProductSlice.reducer;
