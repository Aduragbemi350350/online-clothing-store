import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductReview {
  rating: number;
  like: string;
  comments: string[];
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  price: number;
  createdBy: string;
  slug: string;
  rating: number;
  reviews: ProductReview[];
}

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
  reducers: {
    //reducer for fetching data//

    //reducer that handles fetch
    fetchProduct: (state) => {
      (state.product = null), (state.loading = true), (state.error = null);
    },
    //reducer that handles fetch success
    fetchProductSuccess: (state, action: PayloadAction<Product>) => {
      (state.product = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    //reducer that handles fetch failed
    fetchProductFailed: (state, action: PayloadAction<string>) => {
      (state.product = null),
        (state.loading = false),
        (state.error = action.payload);
    },

    //reducer for fetching data end//

    //reducer for making reviews //
    rateProduct: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },

    rateProductFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    //reducer for making reviews end//
  },
});

export const {
  fetchProduct,
  fetchProductSuccess,
  fetchProductFailed,

  rateProduct,
  rateProductFailed,
} = ProductSlice.actions;

export default ProductSlice.reducer;
