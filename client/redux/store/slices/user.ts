import { createSlice } from "@reduxjs/toolkit";

interface UserDetails {
  _id: string;
  username: string;
  email: string;
}

interface UserState {
  loading: boolean;
  user: UserDetails;
  error: string | null;
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
  }
});

export const { loginUser, logoutuser } = userSlice.actions;

export default userSlice.reducer;
