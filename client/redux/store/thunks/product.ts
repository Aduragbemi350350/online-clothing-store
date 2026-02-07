import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../../src/interface";

export const fetchProductThunk = createAsyncThunk<
  Product,
  string,
  { rejectValue: any }
>("product/fetchProduct", async (slug, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/${slug}`,
      { withCredentials: true },
    );

    console.log({ productResponse: response });
    if (!response)
      return thunkAPI.rejectWithValue({
        name: "Document not found",
        message: "No response from the DB",
        status: 400,
      });

    return response.data as Product;
  } catch (error: any) {
    let errMessage;
    if (error.response.status === 500 || error.status === 500) {
      errMessage = {
        name: "Unknown error",
        message: "Internal server error",
        status: 500,
      };

      console.log({
        mess: "Fetch product from DB failed",
        product: errMessage,
      });
      return thunkAPI.rejectWithValue(errMessage);
    }

    errMessage = error?.response.data;

    console.log({
      mess: "Fetch product from DB failed",
      product: errMessage,
    });

    return thunkAPI.rejectWithValue(errMessage);
  }
});

export default fetchProductThunk;
