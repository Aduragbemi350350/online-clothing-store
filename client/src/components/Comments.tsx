import CommentArticle from "./CommentArticle";
import { Product } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchCommentsThunk } from "../../redux/store/thunks/comment";
import { useEffect } from "react";
import { resetComment } from "../../redux/store/slices/comment";

const Comments = ({ product }: { product: Product }) => {
  //dispatch
  const dispatch = useDispatch<AppDispatch>();

  //states
  const { loading, comments, error } = useSelector(
    (state: RootState) => state.comments,
  );

  //send comment
  async function sendComment(comment: any) {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/comments/",
        comment,
        { withCredentials: true },
      );

      //fetch comments for the product to update the UI
      dispatch(fetchCommentsThunk(product?._id!));

      //show result
      toast.success("Comment successfully made!");
      console.log({
        mess: "Comment on product made successfully",
        res,
      });
    } catch (error: any) {
      const errMess = error.response.data.mess || error.message;
      toast.error(errMess);
      console.log({
        mess: "An error occured while making a comment on product!",
        error,
      });
    }
  }

  //make comment
  const makeCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //get the comment
    const commentTextArea = e.currentTarget.elements.namedItem(
      "comment",
    ) as HTMLTextAreaElement;

    const comment = {
      product: product?._id,
      text: commentTextArea.value,
    };

    //empty the text area
    commentTextArea.value = "";

    //send the post request
    sendComment(comment);
  };

  //use effect
  useEffect(() => {
    //reset comment
    dispatch(resetComment());
  }, []);

  //use effect
  useEffect(() => {
    
    if (!(product?._id)) return ;

      //reset comment
      dispatch(resetComment());

      //fetch comments that belongs to the product
      dispatch(fetchCommentsThunk(product?._id));
  }, [product?._id]);

  //RETURNS
  //RETURNS
  //RETURNS

  //loading
  if (loading) return <p>Comment loading...</p>;

  //error
  if (error)
    return <p className="h3 mx-30">{`No comments: ${error.message}`}</p>;

  //comments
  return (
    <section className="pb-22">
      {/* Give comment */}
      <div className="bg-white antialiased lg:py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
              {comments.length > 1 ? (
                <span>{comments.length} Comments</span>
              ) : comments.length === 1 ? (
                <span>1 Comment</span>
              ) : (
                <span>No comment</span>
              )}
            </h2>
          </div>
          <form className="mb-6" onSubmit={makeCommentHandler}>
            <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={6}
                className="w-full border-0 px-0 text-sm text-gray-900 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary-700 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg px-4 py-2.5 text-center text-xs font-medium text-white focus:ring-4"
            >
              Post comment
            </button>
          </form>
        </div>
      </div>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentArticle
            key={comment._id}
            comment={comment}
            productId={product._id}
          />
        ))
      ) : (
        <div className="mx-auto text-center">
          <h2>Product doesn't have comments</h2>
        </div>
      )}
    </section>
  );
};

export default Comments;
