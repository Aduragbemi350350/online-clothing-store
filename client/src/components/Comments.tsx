import CommentArticle from "./CommentArticle";
import {  Product } from "../interface";
import {  useSelector } from "react-redux";
import {  RootState } from "../../redux/store/store";


const Comments = ({ product }: { product: Product }) => {
  // const dispatch = useDispatch<AppDispatch>();
  
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
