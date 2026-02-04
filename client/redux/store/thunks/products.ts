import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../../src/interface";
import axios from "axios";

export const fetchProductsThunk = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://online-clothing-store-zay8.onrender.com/api/products",
      { withCredentials: true },
    );

    if (!response) throw new Error("No response!");
    return response.data as Product[];
  } catch (error) {
    return thunkAPI.rejectWithValue("Request failed!");
  }
});

export default fetchProductsThunk;
