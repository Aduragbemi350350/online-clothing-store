import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProductReview{
  rating: number,
  like: string,
  comments: string[]
}

interface Product{
  _id: string
  name: string,
  description: string,
  category: string,
  image: string,
  price: number,
  createdBy: string,
  slug: string,
  rating: number,
  reviews: ProductReview[]
}

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
  reducers: {
    //we have a reducer tells us about the state of the products
    fetchProductsStart : (state) =>{
      state.products = [],
      state.loading = true,
      state.error = null
    },
    fetchProductsSuccess : (state, action: PayloadAction<Product[]>) =>{
      state.products = action.payload,
      state.loading = false,
      state.error = null
    },
    fetchProductsFail : (state, action: PayloadAction<string>) =>{
      state.products = [],
      state.loading = false,
      state.error = action.payload
    }
  }
})


export const {
  fetchProductsStart, fetchProductsSuccess, fetchProductsFail
} = productsSlice.actions
export default productsSlice.reducer ;