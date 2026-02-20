import CommentArticle from "./CommentArticle";
import { Product } from "../interface";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const Comments = ({ product }: { product: Product }) => {
  // const dispatch = useDispatch<AppDispatch>();

  const { loading, comments, error } = useSelector(
    (state: RootState) => state.comments,
  );

  //RETURNS
  //RETURNS
  //RETURNS

  //loading
  if (loading) return <p>Comment loading...</p>;

  //error
  console.log({
    commentError: error,
  });
  if (error)
    return <p className="h3 mx-30">{`No comments: ${error.message}`}</p>;

  //comments
  return (
    <section>
      { comments.length > 0 ? comments.map((comment) => (
        <CommentArticle
          key={comment._id}
          comment={comment}
          productId={product._id}
        />
      )) : 
      <div>
        <h2>Product doesn't have comments</h2>
      </div>
      }
    </section>
  );
};

export default Comments;
