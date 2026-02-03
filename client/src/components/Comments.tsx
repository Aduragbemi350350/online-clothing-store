import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentArticle from "./CommentArticle";
import { Comment, Product } from "../interface";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { fetchCommentsThunk } from "../../../redux/store/thunks/comment";

const Comments = ({ product }: { product: Product }) => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, comments, error } = useSelector(
    (state: RootState) => state.comments,
  );


  if(loading) return <p>Comment loading...</p>
  if(error) return <p>{`Error occured: ${error}`}</p>
  return (
    <section>
      {comments.map(
        (comment) =>
          (
            <CommentArticle
              key={comment._id}
              comment={comment}
              product={product._id}
            />
          ),
      )}
    </section>
  );
};

export default Comments;
