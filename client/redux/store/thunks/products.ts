import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../../src/interface";
import axios from "axios";

export const fetchProductsThunk = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:3000/api/products", {
      withCredentials: true,
    });

    return response.data as Product[];
  } catch (error: any) {
    console.log({
      message: "Product fetch failed",
      products: error
    })
    const message = (error?.response.data) || error.message 
    return thunkAPI.rejectWithValue(message);
  }
});

export default fetchProductsThunk;

