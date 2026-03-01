import { createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../../src/interface";
import { fetchCommentsThunk } from "../thunks/comment";

interface CommentState {
  loading: boolean;
  comments: Comment[];
  error: any;
}

const initialState: CommentState = {
  loading: false,
  comments: [],
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetComment(state) {
      ((state.loading = false), (state.comments = []), (state.error = null));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsThunk.pending, (state) => {
        ((state.loading = true), (state.comments = []), (state.error = null));
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
        ((state.comments = action.payload),
          (state.loading = false),
          (state.error = null));
      })
      .addCase(fetchCommentsThunk.rejected, (state, action) => {
        ((state.comments = []),
          (state.loading = false),
          (state.error = action.payload!));
      });
  },
});

export const {
    resetComment
} = commentSlice.actions

export default commentSlice.reducer;
