import { createSlice } from "@reduxjs/toolkit";
import fetchProductThunk from "../thunks/product.ts";
import { Product } from "../../../src/interface";
import reducer from "./products.ts";

interface ProductStateType {
  product: Product | null;
  loading: boolean;
  error: any;
}

const initialState: ProductStateType = {
  product: null,
  loading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct(state) {
      state.loading = false;
      state.product = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.product = null;
      });
  },
});

export const {
  resetProduct
} = ProductSlice.actions

export default ProductSlice.reducer;
