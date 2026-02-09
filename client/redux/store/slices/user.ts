import { createSlice } from "@reduxjs/toolkit";
import fetchUserThunk from "../thunks/user";

interface UserDetails {
  _id: string;
  username: string;
  email: string;
}

interface UserState {
  loading: boolean;
  user: UserDetails;
  error: any;
}

const initialState: UserState = {
  loading: true,
  user: {
    _id: "",
    username: "",
    email: "",
  },
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      ((state.loading = false),
        (state.error = null),
        (state.user = action.payload));
    },
    logoutuser(state) {
      ((state.loading = false),
        (state.error = null),
        (state.user = {
          _id: "",
          username: "",
          email: "",
        }));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserThunk.rejected, (state, action) => {
        ((state.loading = false),
          (state.user = {
            _id: "",
            username: "",
            email: "",
          }),
          (state.error = action.payload));
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUserThunk.pending, (state) => {
        ((state.loading = true),
          (state.user = {
            _id: "",
            username: "",
            email: "",
          }),
          (state.error = null));
      });
  },
});

export const { loginUser, logoutuser } = userSlice.actions;

export default userSlice.reducer;
