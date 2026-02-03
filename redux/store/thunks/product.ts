import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../../client/src/interface";

export const fetchProductThunk = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("product/fetchProduct", async (slug, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/${slug}`,
      {withCredentials: true}
    );

    console.log({productResponse: response})
    if (!response) throw new Error("No product!");
    return response.data as Product;
  } catch (error) {
    console.log({responseError: error})
    return thunkAPI.rejectWithValue("Request failed")
  }
});

export default fetchProductThunk;
