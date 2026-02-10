import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserDetails {
  _id: string;
  username: string;
  email: string;
}

const fetchUserThunk = createAsyncThunk<
  UserDetails,
  void,
  { rejectValue: any }
>("user/getUser", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/currentuser`,
      { withCredentials: true },
    );

    console.log({
      message: "Fetch user result!",
      user: response,
    });

    if (!response) {
      const error = {
        name: "Document Not Found Error!",
        message: "User not found!",
        status: 400,
      };
      return thunkAPI.rejectWithValue(error);
    }

    return response.data;
  } catch (error: any) {
    console.log({
      message: "User fetch failed",
      user: error,
    });

    let errMessage;

    if (error.status === 500) {
      errMessage = {
        name: "Unknown error",
        message: "Internal server error",
        status: 500,
      };

      return thunkAPI.rejectWithValue(errMessage);
    }

    errMessage = error?.response.data || error.message;
    return thunkAPI.rejectWithValue(errMessage);
  }
});

export default fetchUserThunk;
