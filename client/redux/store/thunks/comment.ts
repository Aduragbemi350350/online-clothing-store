import { createAsyncThunk } from "@reduxjs/toolkit";
import { Comment } from "../../../src/interface";
import axios from "axios";

export const fetchCommentsThunk = createAsyncThunk<
  Comment[],
  string,
  { rejectValue: any }
>("comments/fetchComments", async ( productId, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/comments/${productId}`, {
      withCredentials: true,
    });

    console.log({
      mess: "Fetch comments from DB",
      comments: response,
    });
    if (!response)
      return thunkAPI.rejectWithValue({
        message: "No response",
        status: 404,
      });
    return response.data;
  } catch (error: any) {
    let errMessage;
    if (error.response.status === 500 || error.status === 500) {
      errMessage = {
        name: "Unknown error",
        message: "Internal server error",
        status: 500,
      };
      return thunkAPI.rejectWithValue(errMessage);
    }

    errMessage = error?.response.data;

    console.log({
      mess: "Fetch comments from DB failed",
      comments: errMessage,
    });

    return thunkAPI.rejectWithValue(errMessage);
  }
});
